
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash } from "lucide-react";
import { CursosTableProps } from "./CursosTypes";

export const CursosTable: React.FC<CursosTableProps> = ({
  cursos,
  todasSelecionadas,
  handleSelecaoTodas,
  handleSelecaoCurso,
  openEditModal,
  openDeleteModal
}) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <div className="flex items-center">
                <Checkbox 
                  checked={todasSelecionadas} 
                  onCheckedChange={handleSelecaoTodas}
                />
              </div>
            </TableHead>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead className="w-[200px]">Título</TableHead>
            <TableHead className="w-[200px]">Descrição</TableHead>
            <TableHead className="w-[120px]">Nº de Disciplinas</TableHead>
            <TableHead className="w-[150px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <TableRow key={curso.id}>
                <TableCell>
                  <Checkbox 
                    checked={curso.selecionada} 
                    onCheckedChange={() => handleSelecaoCurso(curso.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{curso.id}</TableCell>
                <TableCell>{curso.titulo}</TableCell>
                <TableCell>{curso.descricao}</TableCell>
                <TableCell>{curso.disciplinasIds.length} disciplinas</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => openEditModal(curso)} 
                      variant="outline" 
                      size="sm"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => openDeleteModal(curso)} 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-[#67748a]">
                Nenhum curso encontrado com os filtros aplicados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
