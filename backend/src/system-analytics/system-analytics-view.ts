import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ expression: 'SELECT * FROM v_system_analytics'})
export class SystemAnalyticsView {
    @ViewColumn()
    products_added_in_the_last_month: number;

    @ViewColumn()
    orders_in_the_last_month: number;

    @ViewColumn()
    products_that_need_restocking: number;

    @ViewColumn()
    products_in_users_wishlists: number;
}
