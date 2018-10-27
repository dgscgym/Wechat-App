/* 提供增删改查sql语句 */
var UserSQL = {  
    insert: 'INSERT INTO user(id,userName,password) VALUES(?,?,?)',  // 插入
    queryAll: 'SELECT * FROM user'                                   // 查询
};