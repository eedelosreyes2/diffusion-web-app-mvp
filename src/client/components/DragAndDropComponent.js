import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "To do",
    items: [],
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
  [uuid()]: {
    name: "Yup",
    items: [],
  },
  [uuid()]: {
    name: "ok",
    items: [],
  },
};

// delete
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

// delete
function handleDragEndtemp(result, state, setState) {
  if (!result.destination) return;
  const { source, destination } = result;
  const { lists } = state;

  if (source.listId !== destination.listId) {
    const sourceList = lists[source.droppableId];
    const destList = lists[destination.droppableId];
    const sourceContent = [...sourceList.content];
    const destContent = [...destList.content];
    const [removed] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, removed);

    setState({
      ...lists,
      [source.droppableId]: {
        ...sourceList,
        content: sourceContent,
      },
      [destination.droppableId]: {
        ...destList,
        content: destContent,
      },
    });
  } else {
    const list = lists[source.index];
    const copiedContent = [...list.content];
    const [removed] = copiedContent.splice(source.index, 1);
    copiedContent.splice(destination.index, 0, removed);
    setState({
      ...lists,
      [source.droppableId]: {
        ...list,
        content: copiedContent,
      },
    });
  }
}

function handleDragEnd(result, state, setState) {
  const { source, destination, draggableId } = result;
  const { lists } = state;

  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const list = lists[source.index];
  const newContent = Array.from(list.content);
  newContent.splice(source.index, 1);
  newContent.splice(destination.index, 0, list.content[source.index]);

  const newList = {
    ...list,
    content: newContent,
  };

  const newLists = [...lists];
  newLists[source.index] = newList;

  const newState = {
    lists: newLists,
  };

  setState(newState);
}

function DragAndDropComponent(props) {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [state, setState] = useState({
    lists: [],
  });
  const { lists } = state;
  let droppables = null;

  useEffect(() => {
    setState({ ...state, lists: props.lists });
  }, [props.lists]);

  // Populate Droppables once data is fetched
  if (lists) {
    droppables = lists.map(({ listId, listTitle, content }) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={listId}
        >
          <h2 key={listId}>{listTitle}</h2>
          <div style={{ margin: 8 }}>
            <Droppable droppableId={listTitle} key={listId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgrey",
                    padding: 4,
                    width: 250,
                    minHeight: "50px",
                  }}
                  {...provided.droppableProps}
                >
                  {content.map(
                    ({ contentId, url, contentTitle, brainfart, category }) => {
                      return (
                        <Draggable
                          key={contentId}
                          draggableId={contentTitle}
                          index={contentId}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: "none",
                                  padding: 16,
                                  margin: "0 0 8px 0",
                                  minHeight: "50px",
                                  backgroundColor: snapshot.isDragging
                                    ? "#263B4A"
                                    : "#456C86",
                                  color: "white",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {contentTitle}
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      );
    });
  }

  return (
    <div style={{ display: "flex", justifyContent: "left", height: "100%" }}>
      <DragDropContext
        // onDragEnd={(result) => console.log(result)}
        // onDragEnd={(result) => handleDragEnd(result, state, setState)}
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {/* {droppables} */}

        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: "50px",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default DragAndDropComponent;
