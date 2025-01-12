<?php

namespace App\Models\Enum;

enum PropertyDefinitionType: string
{
    case text = 'textInput';
    case textArea = 'textArea';
    case address = 'address';
    case emailAddress = 'emailAddress';
    case number = 'number';
    case phoneNumber = 'phoneNumber';
    case date = 'date';
    case boolean = 'boolean';
    case list = 'list';
    case website = 'website';
}
