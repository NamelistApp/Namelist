<?php

namespace App\Models\Enum;

enum ObjectTypeId: string
{
    case Contact = 'contact';
    case Form = 'form';
    case FormSubmission = 'form_submission';
    case Engagement = 'engagement';
    case Note = 'note';
    case Tag = 'tag';
    case Oppertunity = 'oppertunity';
    case Company = 'company';
    case OppertunityEntry = 'oppertunity_entry';
    case Task = 'task';
}
