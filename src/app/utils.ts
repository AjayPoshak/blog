import fs from "node:fs";
import path from "node:path";

const METADATA_SEPARATOR = "---";

type MetaFromMarkdown = {
  title: string;
  publishedAt: string;
};

function convertToObj(str: string): MetaFromMarkdown {
  // Break at newlines
  const pairs = str.split("\n");
  // Now each pair is like ['layout: post', 'title: abcd']
  const obj: MetaFromMarkdown = { title: "", publishedAt: "" };
  pairs.forEach((pair) => {
    const [key, value, ...rest] = pair.split(":");
    if (key?.trim().length > 0) {
      obj[key.trim() as keyof MetaFromMarkdown] = rest.length
        ? `${[value, rest].join(":")}`.trim()
        : value.trim();
    }
  });
  return obj;
}

export function extractMetadata(str: string): {
  content: string;
  metadata: { title: string; publishedAt: string };
} {
  const regexp = new RegExp(String.raw`\s${METADATA_SEPARATOR}\s`);
  const secondMatchIndex = str.search(regexp);
  if (secondMatchIndex === -1)
    return { content: str, metadata: { title: "", publishedAt: "" } };
  const metadataStr = str.slice(0, secondMatchIndex);
  const metadataObj = convertToObj(metadataStr);
  return {
    content: str.slice(secondMatchIndex + METADATA_SEPARATOR.length + 1),
    metadata: metadataObj,
  };
}

export function removeExtension(fileName: string): string {
  const dotIndex = fileName.search(/\./);
  if (dotIndex === -1) return fileName;
  const fileNameWithoutExtension = fileName.slice(0, dotIndex);
  return fileNameWithoutExtension;
}

type MetadataType = {
  fileName: string;
  metadata: {
    title: string;
    subtitle?: string;
    readingTime?: string;
    publishedAt: string;
    publishedAtDateObj?: Date;
  };
  fileNameWithoutExtension: string;
};

function sortByDates(list: MetadataType[]) {
  // Convert date string to date object
  const converted = list.map((item) => ({
    ...item,
    metadata: {
      ...item.metadata,
      publishedAtDateObj: new Date(item.metadata.publishedAt),
    },
  }));
  const sortedList = converted.sort((a, b) =>
    a?.metadata?.publishedAtDateObj && b?.metadata?.publishedAtDateObj
      ? Number(b.metadata?.publishedAtDateObj) -
        Number(a.metadata?.publishedAtDateObj)
      : 0,
  );
  return sortedList;
}

export function buildMetadata(): MetadataType[] {
  const fileNames = fs.readdirSync(path.resolve("src/content"));
  const articlesMetadata = fileNames.map((file) => {
    const rawContent = fs.readFileSync(
      path.resolve(`src/content/${file}`),
      "utf-8",
    );
    const { metadata } = extractMetadata(rawContent);
    return {
      fileName: file,
      metadata,
      fileNameWithoutExtension: removeExtension(file),
    };
  });
  return sortByDates(articlesMetadata);
}
