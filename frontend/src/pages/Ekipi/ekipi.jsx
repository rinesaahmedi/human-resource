import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Card, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import CustomModal from "../../components/Modals";
import { EmployeeTable } from "../../components/Table/EmployeesTable";

const Ekipet = () => {
    const [ekipet, setEkipet] = useState([]);
    const [garat, setGarat] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [activeEkipi, setActiveEkipi] = useState();
    const buttonRef = useRef();

    const fetchEkipet = async () => {
        const response = await fetch("/api/ekipet", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            setEkipet(data);
        } else {
            toast.error(data.message || "Nuk u morën ekipet!");
        }
    };

    const fetchGarat = async () => {
        const response = await fetch("/api/garat", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            setGarat(data);
        }
    };

    const actions = [
        {
            icon: <FaEdit />,
            title: "Edit",
            handleClick: (item) => {
                setActiveEkipi(item);
                setIsUpdateModalOpen(true);
            },
        },
        {
            icon: <FaTrashAlt />,
            title: "Delete",
            handleClick: (item) => onDelete(item.id),
        },
    ];

    const onSubmit = async (formData) => {
        const response = await fetch("/api/ekipet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            fetchEkipet();
            setIsCreateModalOpen(false);
        } else {
            toast.error(data.message || "Shtimi dështoi!");
        }
    };

    const handleOnUpdate = async (body) => {
        const response = await fetch(`/api/ekipet/${activeEkipi.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (response.ok) {
            fetchEkipet();
            setIsUpdateModalOpen(false);
            toast.success("Ekipi u përditësua!");
        } else {
            toast.error(data.message || "Gabim gjatë përditësimit!");
        }
    };

    const onDelete = async (id) => {
        const response = await fetch(`/api/ekipet/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            fetchEkipet();
        } else {
            toast.error(data.message || "Fshirja dështoi!");
        }
    };

    useEffect(() => {
        fetchEkipet();
        fetchGarat();
    }, []);

    const CreateEkipiForm = () => {
        const form = useForm({
            initialValues: {
                emriEkipit: "",
                numriPjestareve: "",
                garaId: "",
            },
        });

        return (
            <form
                onSubmit={form.onSubmit((values) => onSubmit(values))}
                className="flex flex-col gap-4"
            >
                <TextInput label="Emri i Ekipit" {...form.getInputProps("emriEkipit")} />
                <TextInput
                    label="Numri i Pjesëtarëve"
                    type="number"
                    {...form.getInputProps("numriPjestareve")}
                />
                <select
                    className="border rounded px-3 py-2"
                    {...form.getInputProps("garaId")}
                >
                    <option value="">Zgjedh Garën</option>
                    {garat.map((gara) => (
                        <option key={gara.id} value={gara.id}>
                            {gara.emriGares}
                        </option>
                    ))}
                </select>
                <Button type="submit" ref={buttonRef}>
                    Shto Ekip
                </Button>
            </form>
        );
    };

    const UpdateEkipiForm = () => {
        const form = useForm({
            initialValues: {
                emriEkipit: activeEkipi?.emriEkipit || "",
                numriPjestareve: activeEkipi?.numriPjestareve || "",
                garaId: activeEkipi?.garaId || "",
            },
            enableReinitialize: true,
        });

        return (
            <form
                onSubmit={form.onSubmit((values) => handleOnUpdate(values))}
                className="flex flex-col gap-4"
            >
                <TextInput label="Emri i Ekipit" {...form.getInputProps("emriEkipit")} />
                <TextInput
                    label="Numri i Pjesëtarëve"
                    type="number"
                    {...form.getInputProps("numriPjestareve")}
                />
                <select
                    className="border rounded px-3 py-2"
                    {...form.getInputProps("garaId")}
                >
                    <option value="">Zgjedh Garën</option>
                    {garat.map((gara) => (
                        <option key={gara.id} value={gara.id}>
                            {gara.emriGares}
                        </option>
                    ))}
                </select>
                <Button type="submit" ref={buttonRef}>
                    Ruaj Ndryshimet
                </Button>
            </form>
        );
    };

    return (
        <div>
            <Card>
                <div className="flex flex-col gap-7">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-semibold">Ekipet</h3>
                        <Button onClick={() => setIsCreateModalOpen(true)}>Shto Ekip</Button>
                    </div>
                    <EmployeeTable
                        actions={actions}
                        headers={[
                            { title: "Emri i Ekipit" },
                            { title: "Numri i Pjesëtarëve" },
                            { title: "Gara" },
                        ]}
                        data={ekipet.map((e) => ({
                            ...e,
                            name: e.emriEkipit,
                            contact: `${e.numriPjestareve} pjesëtarë`,
                            department: e.gara?.emriGares || "-",
                        }))}
                    />
                </div>
            </Card>

            <CustomModal
                showActionButtons
                onSubmit={() => buttonRef.current.click?.()}
                onCancel={() => setIsCreateModalOpen(false)}
                title="Shto Ekip"
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            >
                <CreateEkipiForm />
            </CustomModal>

            <CustomModal
                showActionButtons
                onSubmit={() => buttonRef.current.click?.()}
                onCancel={() => setIsUpdateModalOpen(false)}
                title="Përditëso Ekip"
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
            >
                <UpdateEkipiForm />
            </CustomModal>
        </div>
    );
};

export default Ekipet;
