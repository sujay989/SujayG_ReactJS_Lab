
import {Table} from 'react-bootstrap';
import IExpenseItem from '../models/expense';

type ExpenseByPayeeModel = {

    expenseItems : IExpenseItem[];
}

const ExpenseByPayee = ({expenseItems} : ExpenseByPayeeModel) => {

    const getAllPayeeNames = () : string[] => {

        const uniquePayeeNames : string[] = [];

        expenseItems.forEach( (expenseItem) => {

            let payeeName = expenseItem.payeeName;
            if(!uniquePayeeNames.includes(payeeName)){
                uniquePayeeNames.push(payeeName)
            }
        })

        return uniquePayeeNames;
    }

    const getTotalExpenseByPayee = (payeeName : string) => {

        let totalExpense = 0;
        expenseItems.forEach( (localExpenseItem) => {

            let localPayeeName = localExpenseItem.payeeName;
            if(localPayeeName === payeeName){
                totalExpense = totalExpense + localExpenseItem.price;
            }
        })

        return totalExpense;
    }

    const getGrandTotal = () => {

        let totalExpense = 0;
        expenseItems.forEach( (localExpenseItem) => {

            totalExpense = totalExpense + localExpenseItem.price;
        })

        return totalExpense;
    }

    const getPendingAmount = (payeeName : string) => {

        const totalExpense = getGrandTotal();
        const totalExpenseByPayee = getTotalExpenseByPayee(payeeName);

        const halfAmount = totalExpense/2;

        if(totalExpenseByPayee >= halfAmount){
            return 0;
        }
        else{
           return (halfAmount - totalExpenseByPayee);
        }
    }

    return (
        <div>
             <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Payee Name</th>
                    <th>Contributed Amount</th>
                    <th>Pending Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    getAllPayeeNames().map( (payeeName, index) => {

                        return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{payeeName}</td>
                                <td>{getTotalExpenseByPayee(payeeName)}</td>
                                <td>{getPendingAmount(payeeName)}</td>
                            </tr>
                        )

                    })    
                }
                <tr>
                    <td></td>
                    <td>Grand Total</td>
                    <td>{getGrandTotal()}</td>
                </tr>
            </tbody>
        </Table>
        </div>
    )
}

export {ExpenseByPayee};