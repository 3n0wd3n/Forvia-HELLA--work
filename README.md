# HTW 3.0

## Most recent work I have done

[Navigation logic](https://github.com/3n0wd3n/Forvia-HELLA--work/tree/main/src/SystemModules/Navigation)

## Structure Of The Project

-   Samples folder -> HTML schemes for specific components.

-   SRC folder -> Includes components and global styles for the project.

## Components State

-   [x] Alert
-   [x] Badge
-   [x] Button
-   [x] ButtonGroup
-   [x] Chip
-   [x] Dialog
-   [x] Divider
-   [x] Form
-   [x] Icon
-   [x] ProgressBar
-   [x] Spinner
-   [x] Text

## Useful links

[Prettier Set](https://www.alphr.com/use-prettier-vs-code/)

[Figma Project](https://www.figma.com/files/938809219370854980/project/88797027?fuid=1271746078667242479&source=email_invite)

[Grid System That We Use In Our Project](https://erikmonjas.github.io/css-grid-12-column-layout/)

[Markdown Language Cheat Sheet](https://www.markdownguide.org/cheat-sheet)

[How To Use Markdown In GitLab](https://docs.gitlab.com/ee/user/markdown.html)

## Commands

    $ npx webpack
    $ npx webpack serve

## How To Use BEM

[What is BEM](https://www.vzhurudolu.cz/prirucka/bem)

[How to use BEM corectly](https://www.pullrequest.com/blog/bem-and-sass-whats-the-difference-and-how-to-use-them/)

[Official Website](https://en.bem.info/methodology/)

## Basics of BEM

**Block**

A block is basically a user interface component. An independent UI element that is reusable. Blocks can be embedded into each other freely.

It is denoted by a class with words separated by a hyphen: .block-name.

    /* Block component */
    .btn {}

**Element**

The element within the block that we need to style. An element cannot be used alone in an interface. Its existence only makes sense within a block.

You can recognize it by the class prefixed with the block name and followed by the element name separated by two underscores: .block-name\_\_element-name.

    /* Element that depends upon the block */
    .btn__price {}

**Modifier**

Component Variant. Describes visual properties (.block--small), state (.block--disabled), or behavior (.block--animated-to-left). It should not have a visual-dependent name (.block--green).

    /* Modifier that changes the style of the block */
    .btn--orange {}
    .btn--big {}

## Example of Usage of BEM Combined With SASS

    HTML

    <section class="profile-card">
        <p class="profile-card__name">Name</p>
        <div class="profile-card__actions">
            <button class="btn btn--black">
                <span class="btn-icon btn-icon--check"/>
                <p class="btn-text">Save</p>
            </button>
            <button class="btn btn--red">
                <span class="btn-icon btn-icon--trash"/>
                <p class="btn-text">Delete</p>
            </button>
        </div>
        <div class="profile-card__info">
            Lorem ipsum
            <button class="btn btn--black">Request info</button>
        </div>
    </section>

    SASS

    .profile-card {
        &__name {
            font-size: 14px;
        }

        &__actions {
            padding: 10px;
        }
    }

    .btn {
        &--red,
        &--black {
            color: white;
        }

        &--red {
            background: red;
        }

        &--black {
            background: black;
        }

        &-icon,
        &-text {
            color: white;
        }

        &-text {
            font-size: 12px;
        }
    }

## CSS Module Naming Conventions

Declare new variable with namen of module:

-   Contenct -> con-{name}
-   Structure -> str-{name}
-   Form -> frm-{name}

## Import CSS

    // import css is exist
    import './{module_name}.scss';

## JS Convetion

    const {module_name} = (function () {

        const init = (module) => {
        };



        return {
            init: (module) => init(module),
        };
    });

    // Export module to be accessible from outside
    export const modules = '.{module_name}';
    export const loadModule = () => {
        let modulesArray = document.querySelectorAll(modules);
        modulesArray.forEach((module) => {
            {module_name}().init(module);
        });
    };

## Grid system

    /* Content widths based on device */
    $max-content-width: 1152px;
    $max-content-tablet-width: 848px;
    $max-content-mobile-max-width: 398px;
    $max-content-mobile-min-width: 344px;

**Desktop column count 12**

    <div class="col-md-1"></div> - <div class="col-md-12"></div>

**Desktop column offset 2 - 11**

    <div class="col-md-offset-2"></div> - <div class="col-md-offset-11"></div>

**Tablet column count 8**

    <div class="col-sm-1"></div> - <div class="col-sm-8"></div>

**Tablet column offset 2 - 7**

    <div class="col-sm-offset-2"></div> - <div class="col-sm-offset-7"></div>

**Mobile column count 2**

    <div class="col-xs-1"></div> - <div class="col-xs-2"></div>

### Margins between elements

    /* Margin bottom */
    $grid-row-xs: 80px;
    $grid-row-xs-mobile: 48px;
    $grid-row-sm: 100px;
    $grid-row-sm-mobile: 60px;
    $grid-row-md: 120px;
    $grid-row-md-mobile: 72px;

    <div class="grid-row-xs"></div>
    <div class="grid-row-sm"></div>
    <div class="grid-row-md"></div>

## General classes

### Hidden

Use a single or combination of the available classes for toggling content across viewport breakpoints.

| Class Description | Extra small device < 848px (Phones) | Small devices > 848px (Tablet) | Medium devices > 1152px (Desktop) |
| :---------------: | :---------------------------------: | :----------------------------: | :-------------------------------: |
|    .hidden-xs     |               Hidden                |            Visible             |              Visible              |
|    .hidden-sm     |               Visible               |             Hidden             |              Visible              |
|    .hidden-md     |               Visible               |            Visible             |              Hidden               |

## Code Simplification

Try to simplify code as much as possible. On these 3 examples you will se how code change its complexity.

**First Try**

Useing ids in code to match rigth component with click event.

    import "./chip.scss";
    const comChip = function () {
        const init = (module) => {
            let chips = document.getElementsByClassName("com-chip");
            module.addEventListener("click", () => {
                for (let chip of chips) {
                    if (module.id == chip.id) {
                        chip.style.opacity = "0";
                        chip.style.zIndex = "-1000";
                    }
                }
            });
        };

        return {
            init: (module) => init(module),
        };
    };

    // Export module to be accessible from outside
    export const modules = ".icon-cancel";
    export const loadModule = () => {
        let modulesArray = document.querySelectorAll(modules);
        modulesArray.forEach((module) => {
            comChip().init(module);
        });
    };

**Second**

Useing scope and parent node to identify right element and use inline styles

    import "./chip.scss";
    const comChip = function () {
        const init = (module) => {
            module.addEventListener("click", () => {
                module.parentNode;
                chip.style.opacity = "0";
                chip.style.zIndex = "-1000";
            });
        };

        return {
            init: (module) => init(module),
        };
    };

    // Export module to be accessible from outside
    export const modules = ".icon-cancel";
    export const loadModule = () => {
        let modulesArray = document.querySelectorAll(modules);
        modulesArray.forEach((module) => {
            comChip().init(module);
        });
    };

**Third**

Combine second approach with creating style class with defined opacity and z-index

    import "./chip.scss";
    const comChip = function () {
        const init = (module) => {
            module.addEventListener("click", () => {
                module.parentNode.classList.add("hide");
            });
        };

        return {
            init: (module) => init(module),
        };
    };

    // Export module to be accessible from outside
    export const modules = ".icon-cancel";
    export const loadModule = () => {
        let modulesArray = document.querySelectorAll(modules);
        modulesArray.forEach((module) => {
            comChip().init(module);
        });
    };
