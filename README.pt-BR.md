<div align="center">
  <a href="#instalação">Instalação</a> 
  &nbsp;&nbsp;
  <a href="#como-usar">Como usar</a> 
  &nbsp;&nbsp;
  <a href="#opções">Opções</a>
  &nbsp;&nbsp;
  <a href="#suporte-e-contribuição">Contribuições</a>
</div>

<br>

![Accordium banner](/src/imgs/accordium-cover-pt-BR.png)

Translation: [English](./README.md)

### Instalação

Instale o script com o gerenciador de pacotes de sua preferência:

```javascript
npm install accordium
```

```javascript
pnpm install accordium
```

```javascript
yarn add accordium
```

ou utilize o CDN:

```html
<script src="https://unpkg.com/accordium@1.0.3/dist/accordium.mjs"></script>
```

### Como usar

Após a instalação, basta construir a estrutura HTML inserindo os atributos necessários e instanciar a classe:

```html
<!-- Estrutura dos modos 'multiple' e 'single' -->
<div data-accordium>
  <div data-accordium-body>
    <div data-accordium-header>Header</div>
    <div data-accordium-content>Content</div>
  </div>
</div>

<!-- Estrutura do modo 'nested' -->
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

### Opções

É possível passar algumas opções como parâmetro para atender as necessidades do projeto:

| Opção         | Tipo               | Padrão     | Descrição                                                                                                                                                                                                                                                                 |
| ------------- | ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`        | string \| string[] | 'multiple' | Define qual o modo do accordium. Os modos são atribuídos relativamente à estrutura HTML. Existem 3 modos: `multiple`, `single` e `nested`. Caso haja mais de um accordium, é possível especificar um array de modos correspondentes à ordem desejada para cada instância. |
| `customClass` | string             | 'active'   | Define a classe que será adicionada ao elemento ativo                                                                                                                                                                                                                     |
| `enableAria`  | boolean            | true       | Define os atributos de acessibilidade                                                                                                                                                                                                                                     |

```javascript
// src/js/accordium.js
import { Accordium } from "accordium";

// Padrão
new Accordium({
  mode: "multiple",
  customClass: "active",
  enableAria: true,
});
```

### Suporte e Contribuição

Se você encontrar algum problema ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma [issue](https://github.com/sonidolabs/accordium/issues) no repositório do GitHub.

Se você deseja contribuir, por favor abra uma [pull request](https://github.com/sonidolabs/accordium/pulls) no repositório.

---

### Licença

Este projeto está licenciada sob a [Licença MIT](https://opensource.org/licenses/MIT).

---
