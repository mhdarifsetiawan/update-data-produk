interface ColumnLength {
    column: string;
    maxLength: number;
  }
  
  interface ConflictColumn {
    column: string;
    type: string;
  }
  
  interface AppConfig {
    tableName: string;
    allowedColumns: string[];
    columnInExcel: string[];
    columnLengths: ColumnLength[];
    conflictColumn: ConflictColumn;
  }
  
  const config: AppConfig = require('./config.json');
  
  export default config;