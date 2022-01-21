import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
 
const material = [MatButtonModule,MatButtonToggleModule,MatToolbarModule,
MatIconModule,MatProgressSpinnerModule];

@NgModule({
    imports:[material],
    exports:[material]
})

export class MaterialModule {}