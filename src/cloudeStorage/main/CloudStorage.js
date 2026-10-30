import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { CloudStorageApiConfig } from "../config/CloudStorageApiConfig";

const CloudStorage = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user?.id;


    // 📁 текущий путь (всегда с / на конце)
    const [currentPath, setCurrentPath] = useState(
        `user-${userId}-files/`
    );

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        document.title = "Облачное хранилище";
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file); // имя "file" должно совпадать с сервером
        formData.append("path", currentPath)

        try {
            await CloudStorageApiConfig.post("http://localhost:8080/api/cloud-storage/resources/upload-file", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Файл загружен!");
        } catch (error) {
            console.error(error);
            alert("Ошибка загрузки");
        }
    };

    // 🧠 нормализация пути
    const normalizePath = (path) => {
        if (!path) return "";

        let normalized = path.replace(/\/+?/g, "/");

        if (!normalized.endsWith("/")) {
            normalized += "/";
        }

        return normalized;
    };

    // 🔥 загрузка контента
    const fetchResources = useCallback(async () => {
        try {
            const response = await CloudStorageApiConfig.get(
                "http://localhost:8080/api/cloud-storage/resources/get-content",
                {
                    params: { folderPath: currentPath },
                }
            );
            setItems(response.data);
        } catch (error) {
            if (error.response?.status === 403) {
                navigate("/api/cloude-storage/sign-in");
            }
        }
    }, [currentPath, navigate]);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    // 📂 открыть папку
    const handleOpenFolder = (folderName) => {
        setCurrentPath((prev) => normalizePath(`${prev}${folderName}/`));
    };

    // 🔙 назад
    const handleGoBack = () => {
        setCurrentPath((prev) => {
            const trimmed = prev.endsWith("/") ? prev.slice(0, -1) : prev;
            const parts = trimmed.split("/");

            if (parts.length <= 1) return prev;

            parts.pop();
            return normalizePath(parts.join("/"));
        });
    };

    const isFolder = (item) => item.type === "DIRECTORY";

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.page}>
            <Header />

            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Загрузить</button>
            </div>

            <div style={styles.container}>
                {/* Top bar */}
                <div style={styles.topBar}>
                    <div>
                        <h2 style={styles.title}>Облачное хранилище</h2>
                        <div style={styles.path}>{currentPath}</div>
                    </div>

                    <div style={styles.actions}>
                        <input
                            placeholder="Поиск..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.search}
                        />

                        <button style={styles.backBtn} onClick={handleGoBack}>
                            ← Назад
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div style={styles.grid}>
                    {filteredItems.map((item, index) => (
                        <div
                            key={index}
                            style={styles.card}
                            onClick={() =>
                                isFolder(item) && handleOpenFolder(item.name)
                            }
                        >
                            <div style={styles.icon}>
                                {isFolder(item) ? "📁" : "📄"}
                            </div>

                            <div style={styles.name}>{item.name}</div>

                            {!isFolder(item) && (
                                <div style={styles.size}>{item.size} bytes</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #111 0%, #1a1a1a 50%, #111 100%)",
        color: "#e5e5e5",
        paddingTop: "75px"
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "12px",
    },
    title: {
        margin: 0,
        fontWeight: 600,
    },
    path: {
        fontSize: "12px",
        color: "#9ca3af",
        wordBreak: "break-all",
        marginTop: "4px",
    },
    actions: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
    },
    search: {
        padding: "8px 12px",
        background: "#111",
        border: "1px solid #333",
        color: "#fff",
        borderRadius: "8px",
        outline: "none",
    },
    backBtn: {
        padding: "8px 14px",
        background: "#e5e5e5",
        color: "#000",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 500,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "18px",
    },
    card: {
        background: "#161616",
        border: "1px solid #2a2a2a",
        borderRadius: "16px",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        transition: "all .15s ease",
    },
    icon: {
        fontSize: "42px",
        marginBottom: "8px",
    },
    name: {
        fontSize: "14px",
        textAlign: "center",
        wordBreak: "break-word",
    },
    size: {
        fontSize: "11px",
        color: "#9ca3af",
        marginTop: "4px",
    },
};

export default CloudStorage;
