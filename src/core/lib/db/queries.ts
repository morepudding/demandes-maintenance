import sql from "mssql";

export const selectQuery = ({
    table,
    select,
    where,
    orderBy,
}: {
    table: string;
    select?: string;
    where?: string;
    orderBy?: string;
}) => {
    return addClauses(
        `SELECT ${select ? select : "*"} FROM ${table}`,
        where,
        orderBy,
    );
};

export const insertQuery = ({
    request,
    table,
    values,
}: {
    request: sql.Request;
    table: string;
    values: Record<string, unknown>;
}) => {
    const valuesWithColumns = Object.entries(values).map(([key, value]) => {
        request.input(key, value);
        return `@${key}`;
    });

    return `INSERT INTO ${table} (${Object.keys(values).join(
        ", ",
    )}) OUTPUT INSERTED.* VALUES (${valuesWithColumns.join(", ")})`;
};

export const insertManyQuery = ({
    table,
    values,
}: {
    table: string;
    values: Record<string, unknown>[];
}) => {
    const columns: string[] = [];
    const valuesWithColumns = values.map((value, index) => {
        return `(${Object.entries(value)
            .map(([key, value]) => {
                if (!index) {
                    columns.push(key);
                }
                if (value === null || value === undefined) {
                    return "NULL";
                }

                if (typeof value === "string") {
                    return `'${value}'`;
                }

                return value;
            })
            .join(", ")})`;
    });

    return `INSERT INTO ${table} (${columns.join(
        ", ",
    )}) OUTPUT INSERTED.* VALUES ${valuesWithColumns.join(", ")}`;
};

export const updateByIdQuery = ({
    request,
    table,
    values,
    updateObjectId,
}: {
    request: sql.Request;
    table: string;
    values: Record<string, unknown>;
    updateObjectId: string;
}) => {
    const valuesWithColumns = Object.entries(values).map(([key, value]) => {
        request.input(key, value);
        return `${key} = @${key}`;
    });
    request.input("id", updateObjectId);

    return `UPDATE ${table} SET ${valuesWithColumns.join(
        ", ",
    )} OUTPUT INSERTED.* WHERE ID = @id`;
};

export const updateWhereQuery = ({
    request,
    table,
    values,
    where,
}: {
    request: sql.Request;
    table: string;
    values: Record<string, unknown>;
    where: string;
}) => {
    const valuesWithColumns = Object.entries(values).map(([key, value]) => {
        request.input(key, value);
        return `${key} = @${key}`;
    });

    return `UPDATE ${table} SET ${valuesWithColumns.join(
        ", ",
    )} OUTPUT INSERTED.* WHERE ${where}`;
};

const addClauses = (query: string, where?: string, orderBy?: string) => {
    return addOrderByClause(addWhereClause(query, where), orderBy);
};

const addWhereClause = (query: string, where?: string) => {
    if (where) {
        return `${query} WHERE ${where}`;
    }

    return query;
};

const addOrderByClause = (query: string, orderBy?: string) => {
    if (orderBy) {
        return `${query} ORDER BY ${orderBy}`;
    }

    return query;
};
