import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { AcoesService } from './acoes.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';

const ESPERADIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    filter((valorDigitado) => valorDigitado.length >=3 || !valorDigitado.length),
    debounceTime(ESPERADIGITACAO),
    distinctUntilChanged(),
    switchMap(valorDigitado => this.acoesService.getAcoes(valorDigitado)));

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}
}
