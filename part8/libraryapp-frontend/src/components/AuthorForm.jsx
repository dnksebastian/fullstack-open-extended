import { useState, useEffect, useRef } from 'react'

import Select from 'react-select'

import { EDIT_AGE, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'


const selectStyles = {
    menu: (base) => ({
        ...base,
        maxWidth: 'max-content'
    }),
    control: (base) => ({
        ...base,
        minWidth: '300px',
        maxWidth: 'max-content',
        marginBottom: '10px'
    })
}



const AuthorForm = (props) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const authorsData = props.authors    
    const options = authorsData.map(author => { return { value: author.name, label: author.name }})

    const [ editAge, result ] = useMutation(EDIT_AGE, {
        refetchQueries: [ { query: ALL_AUTHORS } ],
        onError: (err) => {
            const msg = err.graphQLErrors[0].message
            console.log(msg);
            props.handleNotification('Could not update authors age, please check entered data')
        }
    })
    
    const selectInput = useRef()

    const submit = async (e) => {
        e.preventDefault()
        console.log('update author');

        const ageInt = parseInt(born)
        const nameValue = name.value

        editAge({ variables: {nameValue, ageInt} })

        setName('')
        setBorn('')
        selectInput.current.clearValue()
    }

    useEffect(() => {
        if(result.data && result.data.editAuthor === null) {
            console.log('no author with that name found');
        }
    }, [result.data])

    return (
        <div>
            <form onSubmit={submit}>
                <Select
                ref={selectInput}
                defaultValue={name}
                onChange={setName}
                options={options}
                styles={selectStyles}
                isClearable
                />
                <div>
                    born
                    <input 
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}


export default AuthorForm