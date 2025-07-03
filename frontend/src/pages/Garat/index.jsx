import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Card, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import CustomModal from "../../components/Modals";
import { EmployeeTable } from "../../components/Table/EmployeesTable";

const Garat = () => {
    const [garat, setGarat] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [activeGara, setActiveGara] = useState();
    const buttonRef = useRef();

    const fetchGarat = async () => {
        const response = await fetch("/api/garat", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            setGarat(data);
        } else {
            toast.error(data.message || "Nuk u morën garat!");
        }
    };

    const actions = [
        {
            icon: <FaEdit />,
            title: "Edit",
            handleClick: (item) => {
                setActiveGara(item);
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
        const response = await fetch("/api/garat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            fetchGarat();
            setIsCreateModalOpen(false);
        } else {
            toast.error(data.message || "Gara nuk u krijua!");
        }
    };

    const handleOnUpdate = async (body) => {
        const response = await fetch(`/api/garat/${activeGara.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (response.ok) {
            fetchGarat();
            setIsUpdateModalOpen(false);
            toast.success("Gara u përditësua!");
        } else {
            toast.error(data.message || "Gabim gjatë përditësimit!");
        }
    };

    const onDelete = async (id) => {
        const response = await fetch(`/api/garat/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
        });

        const data = await response.json();
        if (response.ok) {
            fetchGarat();
        } else {
            toast.error(data.message || "Fshirja dështoi!");
        }
    };

    useEffect(() => {
        fetchGarat();
    }, []);

    const CreateGaraForm = () => {
        const form = useForm({
            initialValues: {
                emriGares: "",
                llojiGares: "",
            },
        });

        return (
            <form
                onSubmit={form.onSubmit((values) => onSubmit(values))}
                className="flex flex-col gap-4"
            >
                <TextInput label="Emri i Garës" {...form.getInputProps("emriGares")} />
                <TextInput label="Lloji i Garës" {...form.getInputProps("llojiGares")} />
                <Button type="submit" ref={buttonRef}>
                    Shto Garë
                </Button>
            </form>
        );
    };

    const UpdateGaraForm = () => {
        const form = useForm({
            initialValues: {
                emriGares: activeGara?.emriGares || "",
                llojiGares: activeGara?.llojiGares || "",
            },
            enableReinitialize: true,
        });

        return (
            <form
                onSubmit={form.onSubmit((values) => handleOnUpdate(values))}
                className="flex flex-col gap-4"
            >
                <TextInput label="Emri i Garës" {...form.getInputProps("emriGares")} />
                <TextInput label="Lloji i Garës" {...form.getInputProps("llojiGares")} />
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
                        <h3 className="text-2xl font-semibold">Garat</h3>
                        <Button onClick={() => setIsCreateModalOpen(true)}>Shto Garë</Button>
                    </div>
                    <EmployeeTable
                        actions={actions}
                        headers={[
                            { title: "Emri i Garës" },
                            { title: "Lloji i Garës" },
                        ]}
                        data={garat.map((g) => ({
                            ...g,
                            name: g.emriGares,
                            contact: g.llojiGares,
                        }))}
                    />
                </div>
            </Card>

            <CustomModal
                showActionButtons
                onSubmit={() => buttonRef.current.click?.()}
                onCancel={() => setIsCreateModalOpen(false)}
                title="Shto Garë"
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            >
                <CreateGaraForm />
            </CustomModal>

            <CustomModal
                showActionButtons
                onSubmit={() => buttonRef.current.click?.()}
                onCancel={() => setIsUpdateModalOpen(false)}
                title="Përditëso Garë"
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
            >
                <UpdateGaraForm />
            </CustomModal>
        </div>
    );
};

export default Garat;
