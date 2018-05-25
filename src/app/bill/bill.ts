export class Bill {
  constructor(public id: number,
              public name: string,
              public category: number,
              public desc: string,
              public cost: number,
              public user: number,
              public date: Date){}
}

export class BillHistory {
  constructor(public date: Date, public bills: Bill[]) {}
}