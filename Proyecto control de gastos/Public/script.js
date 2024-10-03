
async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  try {
    const method = data.gastoId ? "PUT" : "POST";
    const response = await fetch(event.target.action, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    const messageContainer = document.getElementById("message");

    if (response.ok) {
      messageContainer.textContent = result.message; // Mensaje de éxito
      messageContainer.style.color = "green";
      event.target.reset(); // Reinicia el formulario
      document.getElementById("gastoId").value = "";
      setTimeout(() => {
        messageContainer.textContent = "";
      }, 3000);
    } else {
      messageContainer.textContent =
        result.message || "Error al registrar el gasto";
      messageContainer.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchGastos() {
  const userIdInput = document.querySelector("input[name='userId']");
  const userId = userIdInput.value.trim();

  if (!userId) {
    alert("Por favor, ingrese el numero de cedula del usuario");
    return;
  }

  try {
    const response = await fetch(
      `/gastos?userId=${encodeURIComponent(userId)}`
    );
    const result = await response.json();
    const Gastostabla = document
      .getElementById("gastostable")
      .querySelector("tbody");
    Gastostabla.innerHTML = "";

    if (result.success && result.data.length > 0) {
      result.data.forEach((gasto) => {
        const row = document.createElement("tr");

        row.innerHTML = `<td data-label="ID">${gasto.userId}</td>
                    <td data-label="Monto">${gasto.monto}</td>
                    <td data-label="Categoria">${gasto.categoria}</td>
                    <td data-label="Descripcion">${gasto.descripcion}</td>
                    <td data-label="Fecha">${new Date(
                      gasto.fecha
                    ).toLocaleDateString()}</td>
                    <td data-label="Metodo">${gasto.metodo}</td>
                    <td data-label="Acciones">
                        <button class="submit-btn" onclick="editarGasto('${
                          gasto._id
                        }', '${gasto.userId}', '${gasto.monto}', '${
          gasto.categoria
        }', '${gasto.descripcion}', '${gasto.fecha}', '${
          gasto.metodo
        }')">Editar</button>
                        <button class="submit-btn" onclick="eliminarGasto('${
                          gasto._id
                        }')">Eliminar</button>
                     </td>
        `;
        Gastostabla.appendChild(row);
      });
    } else {
      const noDataRow = document.createElement("tr");
      noDataRow.innerHTML = `<td colspan="7" style="text-align: center;">No hay gastos registrados para esta cédula.</td>`;
      Gastostabla.appendChild(noDataRow);
    }
  } catch (error) {
    console.error("Error al obtener los gatos", error);
  }
}

function editarGasto(id, userId, monto, categoria, descripcion, fecha, metodo) {
  document.getElementById("gastoId").value = id; // Asigna el ID del gasto
  document.querySelector("input[name='userId']").value = userId;
  document.querySelector("input[name='monto']").value = monto;
  document.querySelector("input[name='categoria']").value = categoria;
  document.querySelector("textarea[name='descripcion']").value = descripcion;
  document.querySelector("input[name='fecha']").value = new Date(fecha)
    .toISOString()
    .slice(0, 10); // Formato YYYY-MM-DD
  document.querySelector("select[name='metodo']").value = metodo;
  const editMessage = document.getElementById("message");
  editMessage.style.color = "white";
  editMessage.textContent =
    "Editando gasto. Realiza los cambios y presiona enviar.";
}

async function eliminarGasto(id) {
  const confirmacion = confirm(
    "¿Estás seguro de que deseas eliminar este gasto?"
  );
  if (!confirmacion) return;

  try {
    const response = await fetch(`/gastos/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    const messageContainer = document.getElementById("message");

    if (response.ok) {
      messageContainer.textContent = result.message; // Mensaje de éxito
      messageContainer.style.color = "green";
      fetchGastos(); // Refresca la lista de gastos
    } else {
      messageContainer.textContent =
        result.message || "Error al eliminar el gasto";
      messageContainer.style.color = "red";
    }

    setTimeout(() => {
      messageContainer.textContent = "";
      messageContainer.style.display = "none"; // Oculta el contenedor después de mostrar el mensaje
    }, 3000);
  } catch (error) {
    console.error("Error:", error);
  }
}

document.getElementById("gastosbutton").addEventListener("click", fetchGastos);
