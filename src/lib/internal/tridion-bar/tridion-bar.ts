import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, Input, output, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { XpmStateService } from "../state/headless-xpm-state.service";

@Component({
    selector: "app-tridion-bar",
    imports: [CommonModule],
    templateUrl: "./tridion-bar.html",
    styleUrl: './tridion-bar.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TridionBar {
    readonly isXpmEnabled = input.required<boolean>();
    readonly pageLink = input<boolean | null>(null);
    readonly updateXpmMode = output<void>();
    readonly updateXpmPageMode = output<void>();

    private xpmState = inject(XpmStateService);

    readonly showPageEditMode = this.xpmState.isPageEnabled

    onUpdateXpm(): void {
        this.updateXpmMode.emit()
    }
    onUpdateXpmPage(): void {
        this.updateXpmPageMode.emit()
    }
}