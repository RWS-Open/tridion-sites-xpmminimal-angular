# 🧩 headless-xpm-angular

A lightweight Angular package that adds edit links to your components or pages, enabling quick access to [RWS](https://rws.com) [Tridion Sites Experience Space](https://www.rws.com/content-management/tridion/sites/) (XPM) — ideal for headless CMS setups.


## ✨ Features

- Adds a visual edit icon/toolbar over React components

- Opens Tridion Experience Space (XPM) directly to the associated item (Page or Component)

- Works in staging environments only (as required by XPM)

- Lightweight and non-intrusive

## 🛠 Requirements

- Tridion Sites 10.1+ 

## 📦 Installation

```sh
    npm install headless-xpm-angular
```
## 🔧 Basic Usage

1. Configure the Provider

   Wrap your application structure (usually in app.html) with the provider.

```ts
   import { HeadlessXpmProvider } from 'headless-xpm-angular';

   @Component({
      standalone: true,
      selector: 'app-root',
      imports: [RouterOutlet, HeadlessXpmProvider],
      templateUrl: `
            <headless-xpm-provider 
            [editorUrl]="'https://domain.com/ui/editor'"
            [staging]="true" 
            [showToolbar]="true" 
            [showPageEditorLink]="true"
         >
            <router-outlet></router-outlet>
         </headless-xpm-provider>
      `
   })
   export class App {}
```

2. Add Edit Links to Components
   Use the editor component to wrap specific UI elements you want to make editable.

```ts

   import { HeadlessXpmEditor } from 'headless-xpm-angular';

   @Component({
      standalone: true,
      selector: 'app-banner',
      imports: [HeadlessXpmEditor],
      template: `
         <headless-xpm-editor [tcmId]="tcmId">
            <div class="banner-content">
                  <h1>{{ title }}</h1>
                  <p>{{ body }}</p>
            </div>
         </headless-xpm-editor>
      `
      })
      export class BannerComponent {
      @Input() tcmId!: string;
      @Input() title!: string;
      @Input() body!: string;
   }

```

## 🧩 API Reference

### `<headless-xpm-provider />`


| Prop                 | Type                  | Description                     | Required?               |
| -------------------- | --------------------- | ------------------------------- | ----------------------- |
| `editorUrl`          | `string`              | URL to the Experience Space editor | ✅ Yes                   |
| `staging`            | `boolean`             | Enable the toolbar only in staging | ❌ No (default: `true`) | 
| `showToolbar`        | `boolean`             | Show/hide the editor toolbar             | ❌ No (default: `true`)  |
| `showPageEditorLink` | `boolean`             | Show an extra link for the current page           | ❌ No (default: `true`) |

---


### `<headless-xpm-editor />`

| Prop                 | Type                  | Description                         | Required?                     |
| ---------------------| ----------------------| ----------------------------------- | --------------------------    |
| `tcmId`              | `string`              | TCM URI of the Page or Component    | ✅ Yes                       |
| `isPage`             | `boolean`             | Is this a Page (true) or Component (false)? | ❌ No (default: `false`)     |
| `linkStyle`          | `Object`              | Custom inline styles for the edit link     | ❌ No                        |
| `iconStyle`          | `Object`              | Custom inline styles for the edit icon                | ❌ No                        |
| `containerStyle`     | `Object`              | Custom inline styles for the outer wrapper            | ❌ No                        |
| `contentStyle`       | `Object`              | CSS for the editable content area              | ❌ No                        |


## 👉 Example Angular Apps

Looking for a full implementation? Check out our reference apps:

- [Example Angular Headless App](https://github.com/RWS-Open/tridion-sites-xpmminimal-angular)


## 🛠 Best Practices

- The editor uses content projection (ng-content). Ensure your wrapped elements are relatively positioned if you intend to customize icon placement.

- Ensure your API provides valid TCM URIs (tcm:pubId-itemId).

- Environment Flags: Pass your environment configuration to the [staging] input to ensure the edit UI is stripped in production.