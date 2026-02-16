import { ChangeDetectionStrategy, Component, computed, effect, HostBinding, inject, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

import { XpmStateService } from "../internal/state/headless-xpm-state.service";
import { HeadlessXpmProviderState } from "../internal/state/headless-xpm-provider.state";

function splitStyle(style: string | Record<string, any> | null | undefined) {
    return {
        styleString: typeof style === 'string' ? style : null,
        styleObject: style && typeof style === 'object' && Object.keys(style).length ? style : null
    };
}

@Component({
    standalone: true,
    selector: `headless-xpm-editor`,
    imports: [CommonModule],
    templateUrl: "./headless-xpm-editor.html",
    styleUrl: './headless-xpm-editor.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeadlessXpmEditor {

    private xpmState = inject(XpmStateService);
    private providerState = inject(HeadlessXpmProviderState);

    readonly tcmId = input.required<string>();
    readonly isPage = input(false);

    readonly containerStyle = input<string | Record<string, any>>({});
    readonly contentStyle = input<string | Record<string, any>>({});
    readonly linkStyle = input<string | Record<string, any>>({});
    readonly iconStyle = input<string | Record<string, any>>({});

    readonly editUrl = computed(() => {
        const editorUrl = this.providerState.editorUrl();
        const tcmId = this.tcmId?.();
        if (!editorUrl || !tcmId) return null;

        const path = this.isPage() ? 'page' : 'component';
        return `${editorUrl}/${path}?item=${tcmId}`;
    });

    readonly showXpm = computed(() => this.providerState.staging() && (this.xpmState.isXpmEnabled() || !this.providerState.shouldShowToolbar()))
    readonly showPageXpm = computed(() => this.providerState.staging() && (this.xpmState.isPageEnabled() || !this.providerState.shouldShowToolbar()))

    readonly shouldShowEditIcon = computed(() =>
        this.isPage() ? this.showPageXpm() : this.showXpm()
    );

    readonly shouldShowRegionHover = computed(() => {
        if (this.isPage()) {
            return this.showPageXpm();
        }

        return this.showXpm();
    });

    @HostBinding('class') customClasses = '';

    readonly containerStyles = computed(() => splitStyle(this.containerStyle()));
    readonly contentStyles = computed(() => splitStyle(this.contentStyle()));
    readonly linkStyles = computed(() => splitStyle(this.linkStyle()));
    readonly iconStyles = computed(() => splitStyle(this.iconStyle()));


}