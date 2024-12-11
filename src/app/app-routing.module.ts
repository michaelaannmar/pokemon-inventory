import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { NewCardComponent } from './new-card/new-card.component';
import { CardDetailsComponent } from './card-details/card-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/inventory', pathMatch: 'full'},
  {path: 'inventory', component: InventoryComponent},
  {path: 'newCard', component: NewCardComponent},
  {path: 'detail/:id', component: CardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
