import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Orders = {
  id: number;
  date: string;
  is_done: boolean;
};

class OrdersRepository {
  async create(
    userId: number,
    articles: string,
    total_amount: number,
    date: Date,
    status: string,
  ) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO orders (user_id, articles, total_amount, date, status) VALUES (?, ?, ?, ?, ?)",
      [userId, articles, total_amount, date, status],
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from orders where id = ?",
      [id],
    );
    return rows[0] as Orders;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from orders");
    return rows as Orders[];
  }

  async update(orders: Orders) {
    const [result] = await databaseClient.query<Result>(
      "update orders set is_done = ? where id = ?",
      [orders.is_done, orders.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from orders where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new OrdersRepository();
