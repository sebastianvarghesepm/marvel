import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/DataTable";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import MD5 from "crypto-js/md5";
import { getAllCharacters }  from '../../util/util'
const DataTable = (props) => {
    console.log('I am called')
    const [characters, setCharacters] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 20;

    const headers = [
        { name: "Id", field: "id", sortable: false },
        { name: "Profile Image", field: "thumbnail", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Description", field: "description", sortable: true },
    ];
    let navigate = useNavigate(); 
    const handleRowClick = (id) => {
        let path = "/character-detail"; 
        navigate(path, {
            state: {
              userId: id,
            }
          });
      };

    function  fetchAllCharacters(){
        getAllCharacters(
            `limit=${20}&offset=${currentPage*20-20}`,
                {},
                {},
              )
              .then((res) => {
                hideLoader();
                setTotalItems(res.data.total)
                setCharacters([...characters,...res.data.results]);
              })
              .catch(()=>{});
    }
    
    useEffect(() => {
        showLoader();
       
        fetchAllCharacters();
    }, [currentPage]);

    const charactersData = useMemo(() => {
        let computedCharacters = characters;

        if (search) {
            computedCharacters = computedCharacters.filter(
                character =>
                character.name.toLowerCase().includes(search.toLowerCase()) ||
                character.description.toLowerCase().includes(search.toLowerCase())
            );
        }

       //setTotalItems(computedCharacters.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedCharacters = computedCharacters.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedCharacters.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [characters, currentPage, search, sorting]);

    return ( <>
            <div style={{ margin:50 }}>
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="d-flex justify-content-center">
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>
                    <table className="table table-striped">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {charactersData.map(character => (
                                <tr onClick={() => handleRowClick(character.id)}>
                                    <th scope="row" key={character.id}>
                                        {character.id}
                                    </th>
                                    <td><Image src={`${character.thumbnail.path}.${character.thumbnail.extension}`} width="150" circle /></td> 
                                    <td>{character.name}</td> 
                                    <td>{character.description}</td>
                               </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {loader}
            </div>
        </>
    );
};

export default DataTable;
