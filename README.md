<div align="center">
  <a href="#installation">Installation</a> 
  &nbsp;&nbsp;
  <a href="#how-to-use">How to use</a> 
  &nbsp;&nbsp;
  <a href="#options">Options</a>
  &nbsp;&nbsp;
  <a href="#support-and-contribution">Contributions</a>
</div>

<br>

![Accordium banner](/src/imgs/accordium-cover-en-US.png)

Tradução: [Português Brasileiro](./README.pt-BR.md)

### Installation

Install the script with your preferred package manager:

```javascript
npm install accordium
```

```javascript
pnpm install accordium
```

```javascript
yarn add accordium
```

or use the CDN:

```html
<script src="https://unpkg.com/accordium@1.0.3/dist/accordium.mjs"></script>
```

### How to use

After installation, simply build the HTML structure by inserting the necessary attributes and instantiating the class:

```html
<!-- Structure of 'multiple' and 'single' modes -->
<div data-accordium>
  <div data-accordium-body>
    <div data-accordium-header>Header</div>
    <div data-accordium-content>Content</div>
  </div>
</div>

<!-- Nested mode structure -->
<div data-accordium>
  <div data-accordium-body>
    <div data-accordium-header>Header</div>
    <div data-accordium-content>
      Content
      <div data-accordium-body>
        <div data-accordium-header>Header</div>
        <div data-accordium-content>Content</div>
      </div>
    </div>
  </div>
</div>

<script>
  new Accordium();
</script>
```

### Options

It is possible to pass some options as parameters to meet the needs of the project:

| Option        | Type               | Default    | Description                                                                                                                                                                                                                                                                 |
| ------------- | ------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`        | string \| string[] | 'multiple' | Defines the accordium mode. Modes are assigned relative to the HTML structure. There are 3 modes: `multiple`, `single` and `nested`. If there is more than one accordium, it is possible to specify an array of modes corresponding to the desired order for each instance. |
| `customClass` | string             | 'active'   | Defines the class that will be added to the active element.                                                                                                                                                                                                                 |
| `enableAria`  | boolean            | true       | Sets accessibility attributes                                                                                                                                                                                                                                               |

```javascript
// accordium.js
import { Accordium } from "accordium";

// Default
new Accordium({
  mode: "multiple",
  customClass: "active",
  enableAria: true,
});
```

### Support and Contribution

If you encounter any issues or have suggestions for improvements, feel free to open an [issue](https://github.com/sonidolabs/accordium/issues) on the GitHub repository.

If you want to contribute, please open a [pull request](https://github.com/sonidolabs/accordium/pulls) in the repository.

---

### License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---
