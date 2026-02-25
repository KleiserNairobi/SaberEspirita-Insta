import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarEvent,
  formatos,
  objetivos,
  pilares,
  statusOptions,
} from "@/lib/calendarData";
import { useUpdateEvent } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  id: z.string(),
  date: z.string().min(1, "Data é obrigatória"),
  canal: z.string().min(1, "Canal é obrigatório"),
  formato: z.string().min(1, "Formato é obrigatório"),
  hookA: z.string().min(1, "Hook A é obrigatório"),
  hookB: z.string().min(1, "Hook B é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  cta: z.string().min(1, "CTA é obrigatório"),
  objetivo: z.enum(["TOFU", "MOFU", "BOFU"]),
  pilar: z.string().min(1, "Pilar é obrigatório"),
  responsavel: z.string(), // Mantém como string no form
  brief: z.string(), // Mantém como string no form
  metrica: z.string().min(1, "Métrica é obrigatória"),
  status: z.enum([
    "Ideia",
    "Aprovado",
    "Em Produção",
    "Produzido",
    "Publicado",
  ]),
});

interface EditEventDialogProps {
  event: CalendarEvent;
}

export default function EditEventDialog({ event }: EditEventDialogProps) {
  const [open, setOpen] = useState(false);
  const updateEvent = useUpdateEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...event,
      responsavel: event.responsavel.join(", "),
      brief: event.brief.join("\n"),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Converte strings de volta para arrays
      const formattedValues: CalendarEvent = {
        ...values,
        responsavel: values.responsavel
          .split(",")
          .map(s => s.trim())
          .filter(Boolean),
        brief: values.brief
          .split("\n")
          .map(s => s.trim())
          .filter(Boolean),
      };

      await updateEvent.mutateAsync(formattedValues);
      toast.success("Evento atualizado com sucesso!");
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao atualizar evento");
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Postagem</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias nos detalhes da postagem.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pilar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilar</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o pilar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pilares.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="formato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formato</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o formato" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {formatos.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="objetivo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o objetivo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {objetivos.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="hookA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook A</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hookB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook B</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call to Action (CTA)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brief"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Visual (um por linha)</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="metrica"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Métrica Chave</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="responsavel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsáveis (separados por vírgula)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={updateEvent.isPending}>
                {updateEvent.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
