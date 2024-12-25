import React, { useState } from 'react'
import { Combobox, useCombobox, Group, Avatar, LoadingOverlay, Anchor } from '@mantine/core'

interface CustomComboboxProps {
    children: React.ReactNode
}

const OrganizationCombobox = ({ children }: CustomComboboxProps): JSX.Element => {
    const [search, setSearch] = useState('');
    const combobox = useCombobox({
        onDropdownClose: () => {
            combobox.resetSelectedOption();
            combobox.focusTarget();
            setSearch('');
        },

        onDropdownOpen: () => {
            combobox.focusSearchInput();
        },
    })

    const projects = [
        { id: 1, name: 'Demo Project', initials: 'DP', avatar_url: 'https://www.appatar.io/com.apple.Music' },
        { id: 2, name: 'Demo Project', initials: 'DP', avatar_url: 'https://www.appatar.io/com.apple.Music' },
        { id: 3, name: 'Demo Project', initials: 'DP', avatar_url: 'https://www.appatar.io/com.apple.Music' },
        { id: 4, name: 'Demo Project', initials: 'DP', avatar_url: 'https://www.appatar.io/com.apple.Music' },
        { id: 5, name: 'Demo Project', initials: 'DP', avatar_url: 'https://www.appatar.io/com.apple.Music' }
    ]

    const options = projects
        .filter((project) => project.name.toLowerCase().includes(search.toLowerCase().trim()))
        .map((project) => (
            <Combobox.Option value={project.id.toString()} key={project.id} onClick={() => { /* TODO */ }}>
                <Group w={"100%"}>
                    {project.avatar_url ? (
                        <Avatar
                            src={project.avatar_url}
                            size="sm"
                            radius="md"
                        />
                    ) : (
                        <Avatar color="blue" radius="md">{project.initials}</Avatar>
                    )}
                    {project.name}
                </Group>
            </Combobox.Option>
        ));

    return (
        <Combobox
            store={combobox}
            styles={{ dropdown: { minWidth: 200 } }}
            position="bottom-start"
            transitionProps={{ transition: 'pop-bottom-left', duration: 150 }}
            onOptionSubmit={(val) => {
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target withAriaAttributes={false}>
                <div onClick={(event) => { event.preventDefault(); combobox.openDropdown(); }}>
                    {children}
                </div>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder="Search portals"
                />
                {false ? (
                    <LoadingOverlay />
                ) : (
                    <Combobox.Options>
                        {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
                    </Combobox.Options>
                )}
                <Combobox.Footer>
                    <Group justify='center'>
                        <Anchor size="sm" onClick={() => {
                            combobox.closeDropdown()
                            // TODO
                        }}>
                            New Portal
                        </Anchor>
                    </Group>
                </Combobox.Footer>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default OrganizationCombobox