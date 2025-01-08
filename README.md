# Highlight HCL

Highlight HashiCorp configuration language (HCL) with [highlight.js](https://highlightjs.org/).
You can use this library to highlight Terraform, OpenTofu, and Packer.

## Installation

Using npm to download the library.

```bash
npm install highlight.js hightlight-hcl
```

## Importing the Library

To use the HCL definition with highlight.js, you have two options for importing:

### Optimized Import (Recommended)

Load only the language definitions you need.

```javascript
// import core hljs api and required languages
import hljs from 'highlight.js/lib/core';
import hcl from 'highlight-hcl';

// register language definition
hljs.registerLanguage('hcl', hcl);
```

### Full Import

Load all languages of highlight.js, please note that this generates a large file.

```javascript
import hljs from 'highlight.js';
import hcl from 'highlight-hcl';

hljs.registerLanguage('blade', hcl);
```

More information about importing highlight.js library, please refer
to [here](https://highlightjs.readthedocs.io/en/latest/readme.html#importing-the-library).
