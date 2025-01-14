<?php

namespace App\Models\Enum;

enum PropertyDefinitionType: string
{
    case json = 'json';
    case text = 'text';
    case textArea = 'text_area';
    case emailAddress = 'email_address';
    case number = 'number';
    case phoneNumber = 'phone_number';
    case date = 'date';
    case boolean = 'boolean';
    case list = 'list';
    case address = 'address';
}
