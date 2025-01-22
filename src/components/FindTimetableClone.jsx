import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { faculties, specializations } from "../data";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TimetableName } from ".";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader } from ".";
import { findTimetable } from "@/api/timetableApi";

const FormSchema = z.object({
  year: z.string({
    required_error: "Please select your academic year",
  }),
  semester: z.string({
    required_error: "Please select your current semester",
  }),
  batch: z.string({
    required_error: "Please select your batch",
  }),
  faculty: z.string({
    required_error: "Please select your faculty",
  }),
  specialization: z.string({
    required_error: "Please select your specialization",
  }),
  group: z
    .string({
      required_error: "Please select your group",
    })
    .min(1)
    .max(99),
  subGroup: z.string().optional(),
});

const FindTimetableClone = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  const selectedFaculty = form.watch("faculty");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    toast.info("This may take some time to find the timetable! ⏳");
    try {
      const response = await findTimetable(data);

      if (response.data) {
        const timetable = response.data;

        toast.success("Timetable Found! 🥳");

        // Save timetable details to the local storage
        localStorage.setItem("timetable", JSON.stringify(timetable));

        // Redirect to the timetable page
        navigate(`/timetables/${timetable._id}`);
      } else {
        toast.info("Couldn't find the timetable! 🤷");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error finding timetable 😕"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TimetableName timetable={form.watch()} />
      <div className="flex flex-col p-5 bg-white rounded-xl shadow-xl border border-border">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative">
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4 ">
                            <SelectValue placeholder="Study year?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Y1">Y1</SelectItem>
                          <SelectItem value="Y2">Y2</SelectItem>
                          <SelectItem value="Y3">Y3</SelectItem>
                          <SelectItem value="Y4">Y4</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4 ">
                            <SelectValue placeholder="Semester?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="S1">S1</SelectItem>
                          <SelectItem value="S2">S2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="batch"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4 ">
                            <SelectValue placeholder="Batch? (WE or WD)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="WE">WE</SelectItem>
                          <SelectItem value="WD">WD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="faculty"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4 ">
                            <SelectValue placeholder="Faculty?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {faculties.map((faculty) => (
                            <SelectItem key={faculty} value={faculty}>
                              {faculty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4">
                            <SelectValue placeholder="Specialization?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specializations[selectedFaculty] &&
                          specializations[selectedFaculty].length > 0 ? (
                            specializations[selectedFaculty].map(
                              (specialization) => (
                                <SelectItem
                                  key={specialization}
                                  value={specialization}
                                >
                                  {specialization}
                                </SelectItem>
                              )
                            )
                          ) : (
                            <div className="p-3 text-center text-soft-text border text-sm border-border md:text-base md:p-4">
                              No specializations available
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Group? (1,2,3...)"
                          {...field}
                          className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pb-8">
                <FormField
                  control={form.control}
                  name="subGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Sub group? (1,2,3...)"
                          {...field}
                          className="p-3 text-soft-text border text-sm border-border md:text-base md:p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {loading && <Loader />}
            </div>
            <div className="">
              <button
                type="submit"
                className="px-6 py-3 w-full text-xl font-semibold bg-primary shadow-lg text-white rounded-md hover:bg-dark-blue transition-colors duration-300"
              >
                {loading ? "Finding..." : "Find My Timetable"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FindTimetableClone;
