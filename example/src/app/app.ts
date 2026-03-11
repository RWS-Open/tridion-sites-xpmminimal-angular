import {  Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadlessXpmEditor, HeadlessXpmProvider } from 'xpm-minimal-angular';

import { Banner } from "./banner/banner";

import { AppService } from './app.service';
import { TypedPage } from '../types';
import { Header } from "./header/header";
import { Product } from "./product/product";
import { Campaign } from "./campaign/campaign";
import { Newsroom } from "./newsroom/newsroom";
import { Chatbot } from "./chatbot/chatbot";

import { environment } from '../environments/environment';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, HeadlessXpmProvider, Header, Banner, Product, Campaign, Newsroom, Chatbot, HeadlessXpmEditor],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  editorUrl = signal<string>("")
  staging = signal<boolean>(false)
  showToolbar = signal<boolean>(false)
  showPageEditorLink=signal<boolean>(false)
  
  typedPageData = signal<TypedPage | null>(null);

  private pageService = inject(AppService)

  ngOnInit(): void {

    this.editorUrl.set(environment.experience_space_editor)
    this.staging.set(environment.staging)
    this.showToolbar.set(environment.showToolbar)
    this.showPageEditorLink.set(environment.showPageEditorLink)

    this.pageService.getPageData().subscribe(data => {
      console.log(data)
      this.typedPageData.set(data.data.typedPage)
    })
  }
}
