import { useState } from 'react';
import { PhonebookList } from './PhonebookList';
import { LocalStorage } from '../Hooks/localStorageHook';
import { Form } from './Form';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export function Phonebook() {
  const [contacts, setContacts] = LocalStorage('contacts');
  const [filter, setFilter] = useState('');

  const onFilter = value => {
    setFilter(value);
  };

  const onDelete = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  const UpdateContacs = data => {
    data.id = nanoid();

    if (contacts.some(item => item.number === data.number)) {
      Notify.failure('Контакт с таким номером уже существует');
      return;
    }

    setContacts(prev => [data, ...prev]);
  };

  return (
    <>
      <Form UpdateContacs={UpdateContacs} />
      {contacts.length > 0 && <Filter filter={filter} onFilter={onFilter} />}
      <PhonebookList contacts={contacts} filter={filter} onDelete={onDelete} />
    </>
  );
}
