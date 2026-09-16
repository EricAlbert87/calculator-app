import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css'
})
export class Calculator {
  display = '0';
  firstNumber: number | null = null;
  operator = '';
  waitingForSecondNumber = false;

  enterNumber(number: string): void {
    if (this.display === 'Erreur') {
      this.clear();
    }

    if (this.waitingForSecondNumber) {
      this.display = number;
      this.waitingForSecondNumber = false;
      return;
    }

    if (this.display === '0') {
      this.display = number;
    } else {
      this.display += number;
    }
  }

  enterDecimal(): void {
    if (this.display === 'Erreur') {
      this.clear();
    }

    if (this.waitingForSecondNumber) {
      this.display = '0.';
      this.waitingForSecondNumber = false;
      return;
    }

    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  chooseOperator(operator: string): void {
    const currentNumber = Number(this.display);

    if (this.firstNumber === null) {
      this.firstNumber = currentNumber;
    } else if (this.operator) {
      const result = this.calculateResult(currentNumber);

      if (result === null) {
        this.display = 'Erreur';
        this.firstNumber = null;
        this.operator = '';
        return;
      }

      this.display = String(result);
      this.firstNumber = result;
    }

    this.operator = operator;
    this.waitingForSecondNumber = true;
  }

  calculate(): void {
    if (this.firstNumber === null || this.operator === '') {
      return;
    }

    const secondNumber = Number(this.display);
    const result = this.calculateResult(secondNumber);

    if (result === null) {
      this.display = 'Erreur';
    } else {
      this.display = String(result);
    }

    this.firstNumber = null;
    this.operator = '';
    this.waitingForSecondNumber = true;
  }

  private calculateResult(secondNumber: number): number | null {
    if (this.firstNumber === null) {
      return secondNumber;
    }

    switch (this.operator) {
      case '+':
        return this.firstNumber + secondNumber;

      case '-':
        return this.firstNumber - secondNumber;

      case '*':
        return this.firstNumber * secondNumber;

      case '/':
        return secondNumber === 0 ? null : this.firstNumber / secondNumber;

      default:
        return secondNumber;
    }
  }

  clear(): void {
    this.display = '0';
    this.firstNumber = null;
    this.operator = '';
    this.waitingForSecondNumber = false;
  }

  deleteLastDigit(): void {
    if (this.display === 'Erreur' || this.waitingForSecondNumber) {
      this.clear();
      return;
    }

    if (this.display.length === 1) {
      this.display = '0';
    } else {
      this.display = this.display.slice(0, -1);
    }
  }
}