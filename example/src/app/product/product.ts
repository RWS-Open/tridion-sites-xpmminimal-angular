import { Component, input, signal } from '@angular/core';
import { HeadlessXpmEditor } from 'xpm-minimal-angular';
import { ComponentData } from '../../types';


@Component({
  selector: 'app-product',
  imports: [HeadlessXpmEditor],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  tcmId=signal<string>('')
  components = input<ComponentData[]>()
}
