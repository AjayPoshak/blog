## display: none
display: hidden means that element will not appear on the page at all. There will be no space allocated for it between other tags. Elements are taken out of the flow.
All its descendents are also affected, as they are not displayed either. So measurements cannot be made on either this element or on its descendants as they all would return getBoundingClientRect, clientHeight as zero.

## visbility: hidden
visibility: hidden means that element is not visible on the page but space is allocated. Tag is rendered but not seen on the page. Element is still there on the page, just not visible. Not all descendants are affected from this. If any child has visibility: visible then it would be visible on the page.

## performace impact
Both are equally performant since they both trigger page layout, paint and composite. 
If there is an image tag which is display: none then no network request would be made to fetch the image, but if that image tag has visibility: hidden then still network request would be triggered to fetch the image.

## Opacity: 0 as other alternative
Using opacity:0 would make more sense since it doesn't retrigger the layout step, but it would also allocate the empty space.


