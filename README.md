&nbsp;

#####

## Prerequisites

### Requirements

1. NodeJS v18.20.3 or later

### Install

```
$ npm install
```
### Running App

```
npm run gas
```
OR
```
npm run build
npm run start
```

## Configuration

### Env File

Configuration for .env file

| Code                  | Description                           | Default Value                      |
| --------------------- | ------------------------------------- | ---------------------------------- |
| DB_PORT                  | -                  | 5432                               |
| DB_HOST               | -                   |                                    |
| DB_USER               | -                       |                                    |
| DB_PASSWORD               | -                   |                                    |
| DB_NAME                 | sc              |                                    |
|   |   |


### config.json

Configuration for config.json
```
- create file ./src/config/config.json
```
example value:
```
{
    "tableName": "TABLE_NAME",
    "allowedColumns": ["column_1", "column_2", "column_3"],
    "columnInExcel": ["column_1", "column_2", "column_3"],
    "columnLengths": [
      { "column": "column_1", "maxLength": 60 },
      { "column": "column_2", "maxLength": 40 },
      { "column": "column_3", "maxLength": 20 }
    ],
    "conflictColumn": {
        "column": "column_1",
        "type": "unique"
      }
  }
```