// frontend/src/api/transactions.ts
import axios from "axios";
import { Transaction } from "../types";

const API_URL = "http://127.0.0.1:8000/api";

export type NewTransaction = Omit<Transaction, "id" | "userId">;

export async function getTransactions(): Promise<Transaction[]> {
  const res = await axios.get(`${API_URL}/transacciones/`);
  return res.data;
}

export async function createTransactionAPI(tx: NewTransaction): Promise<Transaction> {
  const res = await axios.post(`${API_URL}/transacciones/`, tx);
  return res.data;
}

export async function deleteTransactionAPI(id: string): Promise<void> {
  await axios.delete(`${API_URL}/transacciones/${id}/`);
}