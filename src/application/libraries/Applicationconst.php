<?php
class Applicationconst {
	const DATATYPE_INTEGER=1;
	const DATATYPE_FLOAT=2;
	const DATATYPE_DATE=3;
    const DATATYPE_SMALL_STRING=4;
    const DATATYPE_LONG_STRING=6;
    
    const OPERATION_LOGIN = 'LOGIN';
    const OPERATION_LOGOUT = 'LOGOUT';
    
    const OPERATION_ADD = 'Save';
    const OPERATION_MODIFY = 'Update';
    const OPERATION_DELETE = 'Delete';
    const OPERATION_GET = 'get';
    const OPERATION_GET_ALL = 'GetAll';
    const OPERATION_GET_BY_FILTER = 'GetByFilter';
    const OPERATION_GET_BY_ID = 'GetById';
    
    const OBJECT_TYPE = 'MCQ';
    
}