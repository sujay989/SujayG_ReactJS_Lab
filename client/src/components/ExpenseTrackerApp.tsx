
import {useEffect, useState} from 'react';
import { getAllExpenseItems } from '../services/expense';
import {Container} from 'react-bootstrap';
import { ExpenseItems } from './ExpenseItems';
import { ExpenseByPayee } from './ExpenseByPayee';
import { ExpenseCreator } from './ExpenseCreator';
import IExpenseItem from '../models/expense';

const ExpenseTrackerApp = () => {

    const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);

    useEffect(() => {

        const getAllExpenseItemsInvoker = async() => {

           const response =  await getAllExpenseItems();

           console.log('Response is : '+JSON.stringify(response));

           setExpenseItems(response);
           
        }

        getAllExpenseItemsInvoker();
    }, [])

    return (
        <Container>
            <h2>
                Expense Tracker App
                <ExpenseCreator expenseItems={expenseItems}></ExpenseCreator>
                <br></br>
            </h2>
            <ExpenseItems expenseItems={expenseItems}></ExpenseItems>
            <ExpenseByPayee expenseItems={expenseItems}></ExpenseByPayee>
        </Container>
    )
}

export {ExpenseTrackerApp};