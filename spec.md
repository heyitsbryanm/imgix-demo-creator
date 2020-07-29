20200723 - Sales demo creator
We need sales demo creator that follows a similar style as this:
https://codepen.io/heyitsbryanm/full/MWYvevx

We use that design pattern across other tools such as Page Weight, so that can be used as inspiration for the design.

Goals

Before we get into the goals of this project, let’s highlight what this project is not intended to do:

❌ This project is not meant replace sandbox
❌ This project is not meant to be an image editor
❌ This project is not meant to have image editing functionality

The goal of this project is to create an image demo creator that can be used to compare and showcase how imgix parameters can be used to solve a variety of different use cases.

Adding and altering images should be strictly done via editing and adding URLs.

Requirements
User editable intro page

A user should be able to modify the intro. Here’s an example of the variable qualities intro:

![](https://paper-attachments.dropbox.com/s_EFC774434A3516C2B9A6F9ACD71B8B89406358E963DE6A85EC1E3D87FE770896_1595550206680_image.png)


At max, a user should be able to edit a `title` & a `description` field.

Page options
The top of a page is a good place to have page options for controlling the rest of the page. These options can be:


- Lock editing
- Create a new demo
- Share demo


Dynamic image groups

The demo needs to support adding multiple groups. A user can add these groups with a button action (maybe a `+` icon?).

The example below shows two groups with a different set of images each.

![](https://paper-attachments.dropbox.com/s_EFC774434A3516C2B9A6F9ACD71B8B89406358E963DE6A85EC1E3D87FE770896_1595545726234_image.png)


Spec

- There should be a max of 2 groups per row
    - A group can have the option of taking the entire width of the page as well
- The image columns supported by each group depends on the size of the group container
    - A group that’s half the size of the page should support 4 image columns at maximum
    - A group that’s the full width of the page should support 8 columns of images at maximum
- Each group should support adding images under its own group

What info should groups show?

- Total byte size of images in a group

What options should a group have?

- Option to apply a parameter set
    - Or, to use individual parameters per image
    - Option to apply custom code to create parameters
- Option to use `srcsets` for a group of images
    - Option to use a custom `sizes` attribute for a group of images
- Option to make set images to “fill” container or to 
- Option to apply all changes and reload images

What design options should users have over groups?

- Option to edit a group’s name
- Option to add a description to a group
- Option to add a group above
- Option to add a group below
- Option to make a group full width
- Option to make a group half size
- Option to delete a group
- Option to duplicate a group
- Option to restrict image size
    - Option to not restrict image size
- Option to re-organize a group


Dynamic image columns

Each group should house individual image columns
Users need to be able to add and edit parameters for the images they added.

![](https://paper-attachments.dropbox.com/s_EFC774434A3516C2B9A6F9ACD71B8B89406358E963DE6A85EC1E3D87FE770896_1595549768213_image.png)


What info should images show?

~~- Parameters applied (if using individual parameters)~~~
~~- Link to sandbox~~
<!-- - Width/Height -->
<!-- - Byte size -->
  - Too difficult, will not do for now.

What design options should users have over images?

~~- Option to add a caption under an image~~
- Option to add an image column to the right
- Option to add an image column to the left
- Option to delete image column
- Option to duplicate image column
~~- Option to edit an image URL~~
- Option to delete an image URL
- Option to add an image URL
~~- Option to add a placeholder image~~
- Option to use an srcset for an image
    - Option to use a custom sizes attribute for an image

It’s important that there are no overlays on an image. Users and customers need to be able to easily inspect an image. An image overlay makes that more difficult.


Editing mode

To reduce development overhead, we should keep editing fairly straightforward and simple. 
