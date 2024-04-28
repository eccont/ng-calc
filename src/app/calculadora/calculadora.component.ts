import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css',
})
export class CalculadoraComponent {
  title = 'calculadora';
  operacaoAnterior:any ="";
  operacaoAtual:any ="";
  primeiraOperacao=true;

  addAoVisor(value:any){
    if (this.primeiraOperacao){
      if(+value >= 0 || value === ".") {
        this.adicionarDigito(value)
      } else {
      this.processaOperacao(value)
      }
    } else {
      this.operacaoAnterior = "";
      this.operacaoAtual = "";
      this.primeiraOperacao = true;
      if(+value >= 0 || value === ".") {
        this.adicionarDigito(value)
      } else {
      this.processaOperacao(value)
      }
    }
  }
  adicionarDigito(digito:any){
    if(digito ==="." && this.operacaoAtual.includes(".")){
      return
    }
    this.operacaoAtual += digito;
    this.atualizaVisor(null, null, null, null)
  }
  processaOperacao(operacao:any){
    if(this.operacaoAtual === "" && operacao !== "C"){
      if(this.operacaoAnterior !== ""){
        this.alterarOperacao(operacao)
      }
      return
    }

    let valorOperacao:any;
    let anterior = +this.operacaoAnterior.split(" ")[0];
    let atual = +this.operacaoAtual;

    switch(operacao){
      case "+":
        valorOperacao = anterior + atual;
        this.atualizaVisor(valorOperacao , operacao, atual, anterior);
        break

      case "-":
        valorOperacao = anterior - atual;
        this.atualizaVisor(valorOperacao , operacao, atual, anterior);
        break

      case "/":
        valorOperacao = anterior / atual;
        this.atualizaVisor(valorOperacao , operacao, atual, anterior);
        break

      case "*":
        valorOperacao = anterior * atual;
        this.atualizaVisor(valorOperacao , operacao, atual, anterior);
        break

      case "DEL":
        this.processarOperacaoDel()
        break

      case "CE":
        this.processarOperacaoCE()
        break

      case "C":
        this.processarOperacaoC()
        break
      
      case "=":
      this.processarOperacaoIgual()
      break
    }
  }
  alterarOperacao(operacao:any){
    const operacoesMat = ["+","-","/","*"];
    if(!operacoesMat.includes(operacao)){
      return;
    }
    this.operacaoAnterior = this.operacaoAnterior.trim().slice(0, -1) + operacao;
  }
  
  atualizaVisor (
    valorOperacao = null,
    operacao = null,
    atual: any,
    anterior: any
  ){
    if(valorOperacao !== null) {
      if(anterior === 0){
        valorOperacao = atual;
      }
      this.operacaoAnterior = `${atual} ${operacao}`
      if(anterior > 0){
        this.operacaoAnterior = `${anterior} ${operacao} ${atual} = `
        this.operacaoAtual = valorOperacao;
      } else {
        this.operacaoAtual = "";
      }
    } 
  }

  processarOperacaoDel(){
    this.operacaoAtual = this.operacaoAtual.slice(0,-1);
  }
  processarOperacaoCE(){
    this.operacaoAtual = "";
  }
  processarOperacaoC(){
    this.operacaoAtual = "";
    this.operacaoAnterior = "";
  }
  processarOperacaoIgual(){
    let operacao = this.operacaoAnterior.split(" ")[1];
    this.primeiraOperacao = false;
    this.processaOperacao(operacao);
  }
}
