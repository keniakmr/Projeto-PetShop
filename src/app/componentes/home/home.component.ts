import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/servicos/produto.service';
import { Produto } from 'src/app/models/Produto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {

  }


}
