import React, { useEffect, useState } from 'react';

import { Inter, Agbalumo } from 'next/font/google'
// import { Container } from './styles';


const agbalumoFont = Agbalumo({ weight: "400", subsets: ['latin'] })
import style from './container.module.css'
import { DataObject, Loading } from '../ContainerForm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })
// import { Container } from './styles';

const ContainerTable: React.FC = () => {
    const [tableData, setTableData] = useState<DataObject[]>()

    const route = useRouter()
    const prepare = async () => {

        setLoading(true)
        const arrayData = [] as any[]
        const docRef = collection(db, "listAll");
        const docSnap = await getDocs(docRef);
        docSnap.docs.map(item => arrayData.push(item.data()))
        const responseData = arrayData as DataObject[];
        setTableData(responseData)

        setLoading(false)

    }

    useEffect(() => {
        prepare()
    }, [])
    const [width, setWidth] = useState<number>(0)
    const [heigth, setHeigth] = useState<number>(0)

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setWidth(document.documentElement.clientWidth)
            setHeigth(document.documentElement.clientHeight)

        }
    }, [])
    const subdomain = width > 768 ? 'web' : 'api'
    const handleClick = () => {
        const phone = "5531986296262"
        const text = `
        *Lista de Convidados*
        \n-------------------------------------${tableData?.map(item => ` 
        *Nome:* ${item.name}
        *Presença:* ${item.denied ? "Presença Negada" : item.isConfirmed ? "Presença Confirmada" : !item.denied && !item.isConfirmed && "Ainda não confirmou"}
        -------------------------------------`
        )}
        `
        route.push(`https://${subdomain}.whatsapp.com/send?phone=${phone}&text=${encodeURI(text)}`)
    }
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <div className={`${style.container} ${agbalumoFont.className}`}>
            <div className={style.glassContainer}>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <>
                            <h1 >Lista de convidados</h1>
                            {
                                width < 765 && (
                                    <button onClick={handleClick}>Enviar lista para WhatsApp</button>
                                )
                            }
                            {
                                tableData && (
                                    <div className={style.containerTable}>
                                        {
                                            width > 765 && (
                                                <button onClick={handleClick}>Enviar lista para WhatsApp</button>
                                            )
                                        }
                                        <table className={style.table}>
                                            <thead>
                                                <tr>
                                                    <th className={style.bordername}>Nome</th>
                                                    <th className={style.qty}>Presença Confirmada</th>
                                                    <th className={`${style.qty} ${style.border}`}>Presença Negada</th>
                                                    <th className={`${style.qty} ${style.border}`}>Sem confirmação</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    tableData.map(item => (
                                                        <>
                                                            <tr className={inter.className}>
                                                                <th style={{ padding: 5 }} >{item?.name}</th>
                                                                <th style={{ padding: 5 }} >{item.isConfirmed === true && "Confirmada"}</th>
                                                                <th style={{ padding: 5 }} >{item?.denied === true && "Negada"}</th>
                                                                <th style={{ padding: 5 }} >{item?.denied === false && item.isConfirmed === false && "Ainda não confirmou"}</th>
                                                            </tr>
                                                        </>
                                                    ))
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                )
                            }


                        </>

                    )}
            </div >
        </div >
    );
}

export default ContainerTable;