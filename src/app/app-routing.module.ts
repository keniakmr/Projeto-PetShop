import { AdmProdutoComponent } from './componentes/adm-produto/adm-produto.component';
import { HomeComponent } from './componentes/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { AutorizadoGuard } from './guards/autorizado.guard';
import { CardComponent } from './componentes/card/card.component';

const routes: Routes = [
  // diz para o angular em qual componente vai buscar por padrão, no caso
  // de não informar a rota na url, redireciona para home

  { path:'',redirectTo: 'home',
    // pathMatch - importante na criação das rotas root(que se originam a partir da raiz)
    pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'card', component:CardComponent},
  {path:'adm-prod', component:AdmProdutoComponent},
  {path:'contato', component:ContatoComponent},
  {path:'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


