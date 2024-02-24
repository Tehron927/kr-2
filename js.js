const setup = () => {
    let successful = [];
    let unSuccessful = [];
    let taxes = 0;
    let taxesMax = {};
    let taxesMin = {};

    for (let company of bank) {
      let totalExpensesPerMonth = 0;
      for (let expense of company.expensesPerYear) {
        totalExpensesPerMonth += expense.total / 12;
      }
      company.expensesPerMonth = totalExpensesPerMonth;
    }

    for (let company of bank) {
      company.procent = (company.expensesPerMonth / (company.budget / 12)) * 100;
    }

    for (let company of bank) {
      let taxedBudget = company.budget * ((100 - company.tax) / 100);
      if (taxedBudget > company.expensesPerMonth) {
        successful.push({ ...company, budget: taxedBudget });
      } else {
        unSuccessful.push({ ...company, budget: taxedBudget });
      }
    }
  
    for (let company of bank) {
      taxes += (company.budget * company.tax) / 100;
    }
  
    taxesMax = bank.reduce((prev, current) => (prev.tax > current.tax ? prev : current));
    taxesMin = bank.reduce((prev, current) => (prev.tax < current.tax ? prev : current));
  
    for (let company of bank) {
      let taxedBudget = company.budget * ((100 - company.tax) / 100);
      company.totalMoney = taxedBudget - company.expensesPerMonth;
    }
  
    console.log("Успешные компании", successful);
    console.log("Неуспешные компании", unSuccessful);
    console.log("Общий налог", taxes);
    console.log("Компания с наибольшим налогом", taxesMax);
    console.log("Компания с наименьшим налогом", taxesMin);
    console.log("Компании после вычета налогов и трат", bank);
  };
  
  setup();
