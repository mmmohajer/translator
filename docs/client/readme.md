# 🖥️ Client (Next.js) Setup Guide

This document explains the structure and conventions of the frontend client, built with Next.js and React, including custom SCSS, base components, main components, and Redux state management.

---

## 🎨 SCSS & CSS Class Conventions

# 🏷️ CSS Class Patterns

The project uses a utility-first and BEM-inspired class naming convention. Each pattern is described below with usage and examples.

---

## 🎨 Color Utility Classes

Color-related utility classes allow you to quickly set background, text, and border colors using semantic or palette-based names defined in SCSS variables.

### Background Color

- Pattern: `bg-{color}`
- Example classes: `bg-red`, `bg-blue`, `bg-theme-one`, `bg-primary`, `bg-secondary`

### Text Color

- Pattern: `text-{color}`
- Example classes: `text-primary`, `text-secondary`, `text-theme-two`, `text-white`, `text-black`

### Border Color

- Pattern: `border-{color}`
- Example classes: `border-gray`, `border-theme-three`, `border-primary`, `border-danger`

All available `{color}` values are defined as SCSS variables in `src/assets/styles/`.

- **General colors** (e.g., `red`, `blue`, `gray`) are managed in `src/assets/styles/general/base/_variables.scss` as a SCSS map:
  ```scss
  $colors: (
    "red": red,
    "blue": blue,
    ...,
  );
  ```
- **Branding colors** (e.g., `theme-one`, `theme-two`) are managed in a separate SCSS map, for example:
  ```scss
  $brandingColors: (
    "theme-one": #c5ff4a,
    // Add or update branding colors here
  );
  ```

To add or update a color:

1. Edit the appropriate SCSS map (`$colors` for general, `$brandingColors` for branding).
2. Add or update the color entry (e.g., `'theme-two': #abcdef,`).
3. The utility classes will automatically pick up the new or updated color if the SCSS is set up to loop through these maps.

**Example usage:**

```html
<div class="bg-theme-one text-white border-red">Themed content</div>
```

To add or change color options, edit the SCSS variables and update the relevant utility class definitions.

---

## 📏 Width & Height Utility Classes

Width and height utility classes allow you to set min, max, and fixed sizes using both percentage and pixel values, as well as viewport-based heights.

### Width Patterns

- Percentages (from `$widthPercentages`):
  - `min-width-per-{val}`: Minimum width as a percentage (e.g., `min-width-per-50` → `min-width: 50%;`)
  - `width-per-{val}`: Width as a percentage (e.g., `width-per-75` → `width: 75%;`)
  - `max-width-per-{val}`: Maximum width as a percentage (e.g., `max-width-per-100` → `max-width: 100%;`)
- Pixels (from `$widthPx`):
  - `min-width-px-{val}`: Minimum width in px (e.g., `min-width-px-200` → `min-width: 200px;`)
  - `width-px-{val}`: Width in px (e.g., `width-px-300` → `width: 300px;`)
  - `max-width-px-{val}`: Maximum width in px (e.g., `max-width-px-1200` → `max-width: 1200px;`)
- Inherit: `width-inherit` → `width: inherit;`

### Height Patterns

- Pixels (from `$boxHeighs`):
  - `min-height-px-{val}`: Minimum height in px (e.g., `min-height-px-100` → `min-height: 100px;`)
  - `height-px-{val}`: Height in px (e.g., `height-px-400` → `height: 400px;`)
  - `max-height-px-{val}`: Maximum height in px (e.g., `max-height-px-800` → `max-height: 800px;`)
- Viewport heights:
  - `min-height-vh-full` → `min-height: 100vh;`
  - `min-height-vh-half` → `min-height: 50vh;`
  - `min-height-vh-one-fourth` → `min-height: 25vh;`
  - `min-height-vh-three-fourth` → `min-height: 75vh;`
  - `min-height-vh-one-third` → `min-height: 33.33333333vh;`
  - `min-height-vh-two-third` → `min-height: 66.66666666vh;`
  - (same for `height-vh-*` and `max-height-vh-*`)

### How It Works

- The SCSS loops through all values in `$widthPercentages`, `$widthPx`, and `$boxHeighs` to generate the classes automatically.
- To add or update size options, edit the relevant variable map.

**Example usage:**

```html
<div class="width-per-75 height-px-400">Sized content</div>
<div class="min-height-vh-half max-width-px-1200">Responsive box</div>
```

---

## ⬛ Border Utility Classes

Border utility classes allow you to control border width, style, radius, and direction using variables defined in both general and branding SCSS files.

### Border Class Pattern

- Pattern: `br-{dir}-{type}-{size}`
  - `{dir}`: Direction (`top`, `left`, `right`, `bottom`, or omit for all sides)
  - `{type}`: Border style (`solid`, `dashed`, `dotted`, etc. from `$borderStyles`)
  - `{size}`: Thickness (from `$borderThickness` or branding values)

#### Examples

- `br-top-solid-2` → `border-top: 2px solid;`
- `br-bottom-dashed-4` → `border-bottom: 4px dashed;`
- `br-solid-1` → `border: 1px solid;` (all sides)

### Border Radius

- There are three main patterns for border radius utility classes:

  1. `br-rad-px-{size}`: Sets border-radius in pixels. `{size}` can be any value from `$borderRadius` (e.g., `br-rad-px-5` → `border-radius: 5px;`).
  2. `br-rad-per-{percentage}`: Sets border-radius in percent. `{percentage}` can be any value from `$borderPercentRadius` (e.g., `br-rad-per-50` → `border-radius: 50%;`).
  3. `br-rad-{branding}`: Uses a named value from branding variables in `$brandingBorderRads` (e.g., `br-rad-md` → `border-radius: 8px;`).

**Examples:**

- `br-rad-px-5` → `border-radius: 5px;`
- `br-rad-per-50` → `border-radius: 50%;`
- `br-rad-lg` → `border-radius: 12px;` (from branding)

Branding border radii are defined in `src/assets/styles/branding/base/_variables.scss`:

```scss
$brandingBorderRads: (
  "sm": 4px,
  "md": 8px,
  "lg": 12px,
  "xl": 16px,
  "2xl": 20px,
  "3xl": 24px,
);
```

### Border Color

- Pattern: `border-{color}` (see Color Utility Classes section)
- Example: `border-theme-one` → `border-color: #c5ff4a;`

#### Variables

- General border thickness, radius, and styles are defined in `src/assets/styles/general/base/_variables.scss`:
  - `$borderThickness`, `$borderRadius`, `$borderPercentRadius`, `$borderStyles`, `$directions`
- Branding border radii are defined in `src/assets/styles/branding/base/_variables.scss`:
  - `$brandingBorderRads`

To add or update border options, edit the relevant SCSS variable maps.

---

## 📏 Margin & Padding Utility Classes

Margin and padding utility classes allow you to quickly apply spacing to elements using both general and branding spacing variables.

### General Spacing Patterns

- Sizing values are defined in `$spaceamounts` (from 0 to 100) in `src/assets/styles/general/base/_variables.scss`.
- Patterns:
  - `m-all-{size}`: All margins (e.g., `m-all-2` → `margin: 2px;`)
  - `m-t-{size}`: Top margin
  - `m-b-{size}`: Bottom margin
  - `m-l-{size}`: Left margin
  - `m-r-{size}`: Right margin
  - `m-x-{size}`: Horizontal margins (left & right)
  - `m-y-{size}`: Vertical margins (top & bottom)
  - `p-all-{size}`: All paddings
  - `p-t-{size}`: Top padding
  - `p-b-{size}`: Bottom padding
  - `p-l-{size}`: Left padding
  - `p-r-{size}`: Right padding
  - `p-x-{size}`: Horizontal paddings
  - `p-y-{size}`: Vertical paddings
- Example: `m-x-2` → `margin-left: 2px; margin-right: 2px;`
- Example: `p-y-10` → `padding-top: 10px; padding-bottom: 10px;`
- Special: `m-l-auto`, `m-r-auto` for auto margins.

### Branding Spacing Patterns

- Sizing values are defined in `$brandingSpacings` in `src/assets/styles/branding/base/_variables.scss`.
- Patterns are the same as above, but use branding names (e.g., `temp-1`, `temp-2`, ...):
  - `m-all-{branding}`: All margins (e.g., `m-all-temp-2` → `margin: 8px;`)
  - `p-x-{branding}`: Horizontal paddings (e.g., `p-x-temp-4` → `padding-left: 16px; padding-right: 16px;`)
- Example: `m-y-temp-5` → `margin-top: 20px; margin-bottom: 20px;`

### How It Works

- The SCSS loops through all values in `$spaceamounts` and `$brandingSpacings` to generate the classes automatically.
- To add or update spacing options, edit the relevant variable map.

**Example usage:**

```html
<div class="m-x-2 p-y-temp-4">Spaced content</div>
```

---

## 🅷 Heading Utility Classes

Heading styles are generated for all heading levels (`h1`–`h6`) using responsive font sizes and weights defined in branding variables.

### Pattern

- Each heading (`h1`–`h6`) automatically receives styles for width, font family, and responsive font size.
- Font sizes are set using the `$brandingHeadingFontSizes` map for each heading and breakpoint:
  - `h1-xs`, `h1-sm`, `h1-md`, `h1-lg`, ...
  - `h2-xs`, `h2-sm`, ... up to `h6-lg`
- Font weight is set by `$brandingFontHeadingWeight` (e.g., `bold`).

### Example SCSS Usage

```scss
@each $header in (1, 2, 3, 4, 5, 6) {
  h#{$header} {
    width: 100%;
    font-family: "Open Sans", sans-serif;
    font-size: map.get($brandingHeadingFontSizes, "h#{$header}-xs");
    @include atSmall {
      font-size: map.get($brandingHeadingFontSizes, "h#{$header}-sm");
    }
    @include atMedium {
      font-size: map.get($brandingHeadingFontSizes, "h#{$header}-md");
    }
    @include atLarge {
      font-size: map.get($brandingHeadingFontSizes, "h#{$header}-lg");
    }
  }
}
```

### Variables

- Font sizes: `$brandingHeadingFontSizes` in `src/assets/styles/branding/base/_variables.scss`
- Font weight: `$brandingFontHeadingWeight`

## To update heading styles, edit the relevant variables in the branding SCSS file.

## 🔤 Font Utility Classes

Font utility classes allow you to control font size and weight using both general and branding variables.

### General Font Patterns

- Font sizes in pixels: `f-s-px-{size}` (from `$fontPxArray`, e.g., `f-s-px-16` → `font-size: 16px;`)
- Font sizes in rem: `f-s-qr-rem-{size}` (from `$fontRemArray`, e.g., `f-s-qr-rem-4` → `font-size: 1rem;`)
- Font weights: `f-w-{weight}` (from `$fontWeightArray`, e.g., `f-w-700` → `font-weight: 700;`)
- Bold: `f-b` → `font-weight: bold;`
- Italic: `f-i` → `font-style: italic;`

General font variables are defined in `src/assets/styles/general/base/_variables.scss`:

```scss
$fontPxArray: $zeroTo100;
$fontRemArray: (1, 2, ..., 16);
$fontWeightArray: (100, 200, ..., 1000);
```

### Branding Font Patterns

- Font sizes: `f-s-{branding}` (from `$brandingFontSizes`, e.g., `f-s-small-xs` → `font-size: 12px;`)
- Font categories (responsive): `f-s-{category}` (from `$brandingFontCategories`, e.g., `f-s-regular`)
  - These use breakpoints (`-xs`, `-sm`, `-md`, `-lg`) and device size mixins (`atSmall`, `atMedium`, `atLarge`).

Branding font variables are defined in `src/assets/styles/branding/base/_variables.scss`:

```scss
$brandingFontSizes: (
  "small-xs": 12px,
  ...,
);
$brandingFontCategories: (
  "small": "small",
  ...,
);
```

**Example usage:**

```html
<span class="f-s-px-18 f-w-700">Bold 18px text</span>
<span class="f-s-regular">Responsive regular text</span>
```

## To add or update font sizes or weights, edit the relevant variable maps.

## 📐 Display Utility Classes (Responsive Visibility)

Display utility classes allow you to control the visibility and display type (flex or block) of elements at different breakpoints. These classes are especially useful for responsive layouts.

### Patterns

- `.show-flex-in-{breakpoints}`: Shows the element as `display: flex` only at the specified breakpoints.
- `.show-block-in-{breakpoints}`: Shows the element as `display: block` only at the specified breakpoints.

#### Supported breakpoint combinations:

- `sm-md-lg`: Show at small, medium, and large sizes
- `md-lg`: Show at medium and large sizes
- `lg`: Show at large size only
- `md-sm-xsm`: Show at medium, small, and extra small (hide at large)
- `sm-xsm`: Show at small and extra small (hide at medium and up)
- `xsm`: Show at extra small only

### How It Works

- By default, the element is hidden (`display: none`).
- At the specified breakpoints, the element is shown as `flex` or `block`.
- Uses SCSS mixins like `@include atSmall`, `@include atMedium`, `@include atLarge` for breakpoints.

### Example usage:

```html
<div class="show-flex-in-sm-md-lg">
  Visible as flex on small, medium, and large screens
</div>
<div class="show-block-in-lg">Visible as block only on large screens</div>
```

## To add or update breakpoints, edit the SCSS mixins and class definitions in the display module.

## 🛠️ Other Utility & Customization Classes

This project includes several additional utility classes for customizing scrollbars, text truncation, form indicators, links, and positioning.

### Scrollbar Customization

- Pattern: `.scroll-type-one`
- Customizes the appearance of scrollbars using branding colors (e.g., `theme-three`, `theme-four`).
- Example SCSS:
  ```scss
  .scroll-type-one {
    &::-webkit-scrollbar {
      width: 20px;
      height: 20px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px map.get($brandingColors, "theme-four");
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: map.get($brandingColors, "theme-three");
      border-radius: 10px;
    }
  }
  ```

### Text Truncation

- Patterns: `.one-line`, `.two-lines`, `.three-lines`, `.four-lines`
- Truncates text to 1, 2, 3, or 4 lines with ellipsis.
- Example:
  ```html
  <div class="two-lines">This text will be truncated after two lines.</div>
  ```

### Form Required Indicator

- Pattern: `.required` (used on form labels)
- Adds a red asterisk after the label using the `::after` pseudo-element.

### Link Styling

- Pattern: `.link`
- Removes underline and sets pointer cursor for links.

### Position Utilities

- Patterns: `.pos-abs`, `.pos-rel`, `.pos-fix`, `.pos-sticky` (with optional modifiers)
  - Modifiers: `--center`, `--lt`, `--rt`, `--lb`, `--rb` for common positions (center, left-top, right-top, left-bottom, right-bottom)
- Example:
  ```html
  <div class="pos-abs pos-abs--center">Centered absolutely</div>
  <div class="pos-fix pos-fix--lt">Fixed to left top</div>
  ```

## Refer to the corresponding SCSS modules for more details and to add or customize these utilities.

## 🌐 Global and Custom Classes

Some global and custom utility classes are defined in the branding `_global.scss` file. These include base resets, container helpers, and other reusable styles that apply project-wide.

### Examples from `_global.scss`

- `%fontclass`: A placeholder selector for consistent font styling, extended by `body`, `textarea`, `button`, etc.
- `.global-container`: Sets a max width and centers content.
- `.global-min-full-vh`: Sets `min-height: 100vh` for full viewport height sections.
- `html`, `body`, `*`, `img`, `a`, `p`, etc.: Base resets and accessibility improvements.

#### Example usage:

```html
<div class="global-container">Centered content</div>
<div class="global-min-full-vh">Full viewport height section</div>
```

You can add your own customized, reusable classes under the global section in `_global.scss`, or create a new module (e.g., for fonts, widths, etc.) and import it in `main.scss` as shown below:

```scss
@use "sass:math";
// General Classes
@use "general/modules/_alignments";
@use "general/modules/_borders" as general_borders;
@use "general/modules/_colors" as general_colors;
@use "general/modules/_display" as general_display;
@use "general/modules/_font";
@use "general/modules/_form";
@use "general/modules/_heights";
@use "general/modules/_links";
@use "general/modules/_opacity";
@use "general/modules/_others";
@use "general/modules/_position";
@use "general/modules/_spacing";
@use "general/modules/_width";
// Branding Classes
@use "branding/modules/_borders" as branding_borders;
@use "branding/modules/_colors" as branding_colors;
@use "branding/modules/_display" as branding_display;
@use "branding/modules/_date_picker";
@use "branding/modules/_heading";
@use "branding/modules/_row";
@use "branding/modules/_scroll";
@use "branding/modules/spacings";
@use "branding/modules/texts";
@use "branding/modules/_truncate";
@use "branding/base/_global";
```

> **Note:** Classes prefixed with `global-` are intentionally defined in `_global.scss` for easy discoverability. Developers should look for these in the global SCSS file.

---

## 🧩 Responsive Mixins

To support responsive design, the project provides SCSS mixins for common breakpoints. These mixins are defined in the branding `base/_mixins.scss` file and use variables for device sizes:

```scss
@use "variables" as *;

@mixin atSmall {
  @media (min-width: $atSmall) {
    @content;
  }
}

@mixin atMedium {
  @media (min-width: $atMedium) {
    @content;
  }
}

@mixin atLarge {
  @media (min-width: $atLarge) {
    @content;
  }
}
```

Use these mixins in your SCSS to apply styles at different breakpoints:

- `@include atSmall { ... }` for small screens and up
- `@include atMedium { ... }` for medium screens and up
- `@include atLarge { ... }` for large screens and up

## This approach keeps your styles DRY and makes it easy to maintain a responsive design system.

## 🧩 Component-Level Modular SCSS

For highly specific or non-reusable styles, use modular SCSS files scoped to individual components. This keeps your global styles clean and ensures that component-specific styles do not leak into other parts of the app.

- The convention is to create a file named `{ComponentName}.module.scss` in the same folder as the component (e.g., `Header.module.scss`).
- You can import variables, mixins, or helpers as needed using SCSS `@use`:

  ```scss
  @use "@/styles/branding/base/helpers" as *;

  .container {
    height: 100px;
  }
  ```

- These classes are only available to the component that imports them, ensuring encapsulation.

Use modular SCSS for styles that are unique to a component and not intended for reuse elsewhere in the project.

---
