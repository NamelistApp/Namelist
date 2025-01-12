<?php

namespace App\Models\Enum;

enum PropertyDefinitionType: string
{
    case text = 'TEXT';
    case email = 'EMAIL';
    case number = 'NUMBER';
    case phoneNumber = 'PHONE_NUMBER';
    case date = 'DATE';
    case boolean = 'BOOLEAN';
    case list = 'LIST';
}
