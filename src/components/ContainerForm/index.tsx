import React, { useEffect, useState } from 'react';
import { Inter, Agbalumo } from 'next/font/google'
// import { Container } from './styles';


const agbalumoFont = Agbalumo({ weight: "400", subsets: ['latin'] })
import style from './container.module.css'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config';
import { list } from './list';

const inter = Inter({ subsets: ['latin'] })
interface SelectObject {
    label: string;
    value: string | number;
}
interface InputSelect {
    options: SelectObject[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface DataObject {
    name: string,
    adult: number | string,
    children: number | string,
    isConfirmed: boolean,
    value: number | string,
    denied: boolean,
    id: string | number
}
export const Loading: React.FC = () => {
    return (
        <div className={style.ldsDualRing}></div>
    )
}
const InputSelect: React.FC<InputSelect> = ({ options, onChange }) => {
    return (
        <select size={0} className={style.selected} onChange={(e) => onChange(e)}>

            <option value={-1}> Selecione seu nome</option>
            {
                options && options.length > 0 && (
                    <>
                        {
                            options.map(item => (
                                <option onClick={(e) => console.log(item.value)} value={item.value}>{item.label}</option>
                            ))
                        }
                    </>
                )
            }

        </select>

    )
}
const ContainerForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<DataObject[]>()
    const [actionUser, setActionUser] = useState<'denied' | 'confirmed'>()
    const [options, setOptions] = useState<SelectObject[]>();
    const [tableData, setTableData] = useState<DataObject | null>();
    const [value, setValue] = useState<number | string>()
    const dbCreate = () => {
        setTimeout(() => {
            list.map((item, index) => {

                const create = async () => {
                    const data = await setDoc(doc(db, "listAll", `${item.name.toLocaleLowerCase().trim().split(' ').join('-')}-${index}-list`), {
                        name: item.name,
                        adult: item.adult,
                        children: item.children ? item.children : null,
                        isConfirmed: false,
                        value: index,
                        denied: false,
                        id: `${item.name.toLocaleLowerCase().trim().split(' ').join('-')}-${index}-list`
                    });
                }
                create()
            })
        }, 100)
    };

    const prepare = async () => {
        setLoading(true)
        const arrayData = [] as any[]
        const docRef = collection(db, "listAll");
        const docSnap = await getDocs(docRef);
        docSnap.docs.map(item => arrayData.push(item.data()))
        const responseData = arrayData as DataObject[];
        setData(responseData)

        setLoading(false)
    }

    useEffect(() => {

        prepare()
        // dbCreate()

    }, [])

    useEffect(() => {
        const dataTable = data?.filter(e => {
            if (`${e.value}` === `${value}`) {
                return e;
            } else {
                return null;
            }
        })
        if (dataTable && dataTable?.length > 0) {
            setTableData(dataTable[0])
        } else {
            setTableData(null)
        }
    }, [value])
    useEffect(() => {
        if (data && data?.length > 0) {
            const optionsSelect = [] as SelectObject[]

            data.filter(item => item.isConfirmed === false).filter(item => item.denied === false).map(item => {
                optionsSelect.push({
                    label: item.name,
                    value: item.value,
                })
            })

            setOptions(optionsSelect)
        }
    }, [data])

    const confirmPresence = async (value: string | number | undefined, action: 'confirmed' | 'denied') => {
        setLoading(true)
        const ref = doc(db, 'listAll', `${tableData?.id}`)
        if (action === 'confirmed') {
            await updateDoc(ref, {
                isConfirmed: true
            })
            setActionUser(action)
        } else {
            await updateDoc(ref, {
                denied: true
            })
            setActionUser(action)
        }
        setLoading(false)
    }

    return (
        <div className={`${style.container} ${agbalumoFont.className}`}>
            <div className={style.glassContainer}>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <>
                            {
                                actionUser ? (
                                    <>
                                        <div>
                                            {actionUser === 'confirmed' ? (
                                                <>
                                                    <h1>Você acaba de confirmar sua presença</h1>
                                                    <h3>Nos vemos na festa!</h3>
                                                </>

                                            ) : (
                                                <>
                                                    <h1>Você acaba de negar sua presença</h1>
                                                    <h3>Te vejo na próxima!</h3>
                                                </>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1 >Confirme sua presença</h1>
                                        <h3>Procure na lista pelo seu nome ou apelido!</h3>
                                        <div className={style.containerSelect}>
                                            {
                                                options && (
                                                    <InputSelect options={options} onChange={(e) => {
                                                        setValue(e.target.value)
                                                    }} />
                                                )
                                            }
                                        </div>
                                        {
                                            tableData && (
                                                <div className={style.containerTable}>
                                                    <table className={style.table}>
                                                        <thead>
                                                            <tr>
                                                                <th className={style.bordername}>Nome</th>
                                                                <th className={style.qty}>Quantidade de Adultos</th>
                                                                <th className={`${style.qty} ${style.border}`}>Quantidade de Crianças</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className={inter.className}>
                                                                <th style={{ padding: 5 }} >{tableData?.name}</th>
                                                                <th style={{ padding: 5 }} >{tableData?.adult}</th>
                                                                <th style={{ padding: 5 }} >{tableData?.children}</th>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div>
                                                        <button onClick={() => confirmPresence(value, 'confirmed')}>Confirma Presença</button>
                                                        <button onClick={() => confirmPresence(value, 'denied')}>Negar Presença</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div >
        </div >
    );
}

export default ContainerForm;