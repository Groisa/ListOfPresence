import React, { useEffect, useState } from 'react';
import { Inter, Agbalumo } from 'next/font/google'
// import { Container } from './styles';


const agbalumoFont = Agbalumo({ weight: "400", subsets: ['latin'] })
import style from './container.module.css'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/config';
import { list } from './list';

const inter = Inter({ subsets: ['latin'] })
interface SelectObject {
    label: string;
    value: string | number;
}
interface InputSelect {
    options: SelectObject[]
}

interface DataObject {
    name: string,
    adult: number | string,
    children: number | string,
    isConfirmed: boolean,
    value: number | string
}

const InputSelect: React.FC<InputSelect> = ({ options }) => {

    const [value, setValue] = useState<number>(-1)

    const [expand, setExpand] = useState<boolean>(false)

    return (
        <div className={`${style.containerSelected} ${inter.className}`} >
            <div className={style.containerMainOption} onClick={() => setExpand(e => !e)}>
                <option> Selecione seu nome</option>
                <option > ▼</option>
            </div>
            {
                expand && (
                    <div className={style.select}>

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

                    </div>
                )
            }
        </div >

    )
}
const ContainerForm: React.FC = () => {
    const [data, setData] = useState<DataObject[]>()
    const [options, setOptions] = useState<SelectObject[]>();
    // const dbCreate = () =>  {
    //     setTimeout(() => {
    //         list.map((item, index) => {

    //             const create = async () => {
    //                 const data = await setDoc(doc(db, "listAll", `${item.name.toLocaleLowerCase().trim().split(' ').join('-')}-${index}-list`), {
    //                     name: item.name,
    //                     adult: item.adult,
    //                     children: item.children ? item.children : null,
    //                     isConfirmed: false,
    //                     value: index
    //                 });
    //             }
    //             create()
    //         })
    //     }, 100)
    // };

    const prepare = async () => {
        const arrayData = [] as any[]
        const docRef = collection(db, "listAll");
        const docSnap = await getDocs(docRef);
        docSnap.docs.map(item => arrayData.push(item.data()))
        const responseData = arrayData as DataObject[];


        setData(responseData)
    }

    useEffect(() => {

        prepare()

    }, [])


    useEffect(() => {
        if (data && data?.length > 0) {
            const optionsSelect = [] as SelectObject[]

            data.map(item => {
                optionsSelect.push({
                    label: item.name,
                    value: item.value,
                })
            })

            setOptions(optionsSelect)
        }
    }, [data])
    return (
        <div className={`${style.container} ${agbalumoFont.className}`}>
            <div className={style.glassContainer}>
                <h1 >Confirme sua presença</h1>
                <h3>Procure na lista pelo seu nome ou apelido!</h3>
                <div className={style.containerSelect}>
                    {
                        options && (
                            <InputSelect options={options} />
                        )
                    }
                </div>
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
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ContainerForm;