import { ChangeDetectionStrategy, Component, inject, input, PLATFORM_ID, Signal, effect } from "@angular/core";
import { TridionBar } from "../internal/tridion-bar/tridion-bar";
import { XpmStateService } from "../internal/state/headless-xpm-state.service";
import { injectHeadlessXpmStyles } from '../internal/style/xpm-style';
import { isPlatformBrowser } from "@angular/common";
import { HeadlessXpmProviderState } from "../internal/state/headless-xpm-provider.state";

@Component({
    standalone: true,
    selector: 'headless-xpm-provider',
    templateUrl: './headless-xpm-provider.html',
    imports: [TridionBar],
    providers: [XpmStateService, HeadlessXpmProviderState],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeadlessXpmProvider {

    editorUrl = input.required<string>();
    staging = input(false);
    showToolbar = input(false);
    showPageEditorLink = input(true);

    private readonly platformId = inject(PLATFORM_ID);
    private readonly xpmState = inject(XpmStateService);
    private readonly providerState = inject(HeadlessXpmProviderState);


    readonly isXpmEnabled = this.xpmState.isXpmEnabled
    readonly shouldShowToolbar: Signal<boolean> = this.providerState.shouldShowToolbar;
    readonly pageLink = this.providerState.showPageEditorLink

    constructor() {
        injectHeadlessXpmStyles(isPlatformBrowser(this.platformId));
        effect(() => {
            this.providerState.updateEditorUrl(this.editorUrl());
            this.providerState.updateStaging(this.staging());
            this.providerState.updateShowToolbar(this.showToolbar());
            this.providerState.updateShowPageEditorLink(this.showPageEditorLink());
        });
    }

    onToggleXpmMode(): void {
        this.xpmState.toggleXpmMode()
    }

    onToggleXpmPageMode(): void {
        this.xpmState.toggleXpmPageMode()
    }
}