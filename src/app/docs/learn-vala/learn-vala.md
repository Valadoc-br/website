
Vala Tutorial
=============


Introduction
------------

Disclaimer: Vala is an ongoing project, and its features may change. I will try to keep this tutorial as up to date as I can, but I'm not perfect. Also, I can't promise that the techniques which I suggest are necessarily the best in practice, but again I will try to keep up with that sort of thing.

### What is Vala?

Vala is a new programming language that allows modern programming techniques to be used to write applications that run on the GNOME runtime libraries, particularly GLib and GObject. This platform has long provided a very complete programming environment, with such features as a dynamic type system and assisted memory management. Before Vala, the only ways to program for the platform were with the machine native C API, which exposes a lot of often unwanted detail, with a high level language that has an attendant virtual machine, such as Python or the Mono C# language, or alternatively, with C++ through a wrapper library.

Vala is different from all these other techniques, as it outputs C code which can be compiled to run with no extra library support beyond the GNOME platform. This has several consequences, but most importantly:

*   Programs written in Vala should have broadly similar performance to those written directly in C, whilst being easier and faster to write and maintain.
*   A Vala application can do nothing that a C equivalent cannot. Whilst Vala introduces a lot of language features that are not available in C, these are all mapped to C constructs, although they are often ones that are difficult or too time consuming to write directly.

As such, whilst Vala is a modern language with all of the features you would expect, it gains its power from an existing platform, and must in some ways comply with the rules set down by it.

### Who is this tutorial for?

This tutorial will not go into depth about basic programming practices. It will only briefly explain the principles of object-oriented programming, instead focusing on how Vala applies the concepts. As such it will be helpful if you have experience of a variety of programming languages already, although in-depth knowledge of any particular one is not required.

Vala shares a lot of syntax with C#, but I will try to avoid describing features in terms of their similarity or differences with either C# or Java, with the aim of making the tutorial more accessible.

What will be useful is a reasonable understanding of C. Whilst this isn't needed for understanding Vala per se, it is important to realise that Vala programs are executed as C, and will often interact with C libraries. Knowledge of C will certainly make a deeper understanding of Vala far easier to come by.

### Conventions

Code will be in monospaced text, commands will all be prefaced with a $ prompt. Other than that, everything should be obvious. I tend to code very explicitly, including some information that is actually implied. I will try to explain where some things can be omitted, but that doesn't mean that I encourage you do to this.

At some point I will add in references to the Vala documentation, but that isn't really possible yet.

A First Program
---------------

Sadly predictable, but still:

```vala
class Demo.HelloWorld : GLib.Object {
 public static int main(string\[\] args) {
 stdout.printf("Hello, World\\n");
 return 0;
 }
}
```

Of course, that is a Vala _Hello World_ program. I expect you can recognise some parts of it well enough, but just to be thorough I shall go through it step by step.

```vala
class Demo.HelloWorld : GLib.Object {
```

This line identifies the beginning of a class definition. Classes in Vala are very similar in concept to other languages. A class is basically a type of object, of which instances can be created, all having the same properties. The implementation of classed types is taken care of by the _gobject_ library, but details of this are not important for general usage.

What is important to note is that this class is specifically described as being a subclass of _GLib.Object_. This is because Vala allows other types of class, but in most cases, this is the sort that you want. In fact, some language features of Vala are only allowed if your class is descended from GLib's _Object_.

Other parts of this line show namespacing and fully qualified names, although these will be explained later.

```vala
public static int main(string\[\] args) {
```

This is the start of a method definition. A method is a function related to a type of object that can be executed on an object of that type. The static method means that the method can be called without possessing a particular instance of the type. The fact that this method is called _main_ and has the signature it does means that Vala will recognise it as the entry point for the program.

The _main_ method doesn't have to be defined inside a class. However, if it is defined inside a class it must be static. It doesn't matter if it's public or private. The return type may be either int or void. With a void return type the program will implicitly terminate with exit code 0. The string array parameter holding the command line arguments is optional.

```vala
stdout.printf("Hello, World\\n");
```

_stdout_ is an object in the _GLib_ namespace that Vala ensures you have access to whenever required. This line instructs Vala to execute the method called _printf_ of the _stdout_ object, with the hello string as an argument. In Vala, this is always the syntax you use to call a method on an object, or to access an object's data. \\n is the escape sequence for a new line.

return 0;

return is to return a value to the caller and terminate the execution of the _main_ method which also terminates the execution of the program. The returned value of the _main_ method is then taken as the exit code of the program.

The last lines simply end the definitions of the method and class.

### Compile and Run

Assuming you have Vala installed, then all it takes to compile and execute this program is:

$ valac hello.vala
$ ./hello

_valac_ is the Vala compiler, which will compile your Vala code into a binary. The resulting binary will have the same name as the source file and can then be directly executed on the machine. You can probably guess the output.

Basics
------

### Source Files and Compilation

Vala code is written in files with _.vala_ extensions. Vala does not enforce as much structure as a language like Java - there are no concepts of packages or class files in the same way. Instead structure is defined by text inside each file, describing the logical location of the code with constructs such as namespaces. When you want to compile Vala code, you give the compiler a list of the files required, and Vala will work out how they fit together.

The upshot of all this is that you can put as many classes or functions into a file as you want, even combining parts of different namespaces in together. This is not necessarily a good idea. There are certain conventions you probably want to follow. A good example of how to structure a project in Vala is the Vala project itself.

All source files for the same package are supplied as command line parameters to the Vala compiler valac, along with compiler flags. This works similarly to how Java source code is compiled. For example:

$ valac compiler.vala --pkg libvala

will produce a binary with the name _compiler_ that links with the package _libvala_. In fact, this is how the _valac_ compiler is produced!

If you want the binary to have a different name or if you have passed multiple source files to the compiler you can specify the binary name explicitly with the \-o switch:

$ valac source1.vala source2.vala -o myprogram
$ ./myprogram

If you give _valac_ the \-C switch, it won't compile your program into a binary file. Instead it will output the intermediate C code for each of your Vala source files into a corresponding C source file, in this case _source1.c_ and _source2.c_. If you look at the content of these files you can see that programming a class in Vala is equivalent to the same task in C, but a whole lot more succinct. You will also notice that this class is registered dynamically in the running system. This is a good example of the power of the GNOME platform, but as I've said before, you do not need to know much about this to use Vala.

If you want to have a C header file for your project you can use the \-H switch:

$ valac hello.vala -C -H hello.h

### Syntax Overview

Vala's syntax is an amalgam heavily based on C#'s. As a result, most of this will be familiar to programmers who know any C-like language, and in light of this I have kept things brief.

Scope is defined using braces. An object or reference is only valid between { and }. These are also the delimiters used to define classes, methods, code blocks etc, so they automatically have their own scope. Vala is not strict about where variables are declared.

An identifier is defined by its type and a name, e.g. int c meaning an integer called _c_. In the case of value types this also creates an object of the given type. For reference types these just define a new reference that doesn't initially point to anything.

Identifier names may be any combination of letters (\[a-z\], \[A-Z\]), underscores and digits. However, to define or refer to an identifier with a name that either starts with a digit or is a keyword, you must prefix it with the '@' character. This character is not considered a part of the name. For example, you can name a method _foreach_ by writing @foreach, even though this is a reserved Vala keyword. You can omit the '@' character when it can be unambiguously interpreted as an identifier name, such as in "foo.foreach()".

Reference types are instantiated using the new operator and the name of a construction method, which is usually just the name of the type, e.g. Object o = new Object() creates a new Object and makes _o_ a reference to it.

### Comments

Vala allows comments in code in different ways.

// Comment continues until end of line
/\* Comment lasts between delimiters \*/
/\*\*
 \* Documentation comment
 \*/

These are handled in the same way as in most other languages and so need little explanation. Documentation comments are actually not special to Vala, but a documentation generation tool like [Valadoc](https://wiki.gnome.org/Projects/Valadoc) will recognise them.

### Data Types

Broadly speaking there are two types of data in Vala: _reference types_ and _value types_. These names describe how instances of the types are passed around the system - a value type is copied whenever it is assigned to a new identifier, a reference type is not copied, instead the new identifier is simply a new reference to the same object.

A constant is defined by putting const before the type. The naming convention for constants is ALL\_UPPER\_CASE.

#### Value Types

Vala supports a set of the simple types as most other languages do.

*   Byte, char, uchar; their names are _char_ for historical reasons.
    
*   Character, unichar; a 32-bit Unicode character
    
*   Integer, int, uint
    
*   Long Integer, long, ulong
    
*   Short Integer, short, ushort
    
*   Guaranteed-size Integer, int8, int16, int32, int64 as well as their unsigned siblings uint8, uint16, uint32, uint64. The numbers indicate the lengths in bits.
    
*   Float number, float, double
    
*   Boolean, bool; possible values are true and false
    
*   Compound, struct
    
*   Enumeration, enum; represented by integer values, not as classes like Java's enums
    

Here are some examples.

/\* atomic types \*/
unichar c = 'u';
float percentile = 0.75f;
const double MU\_BOHR = 927.400915E-26;
bool the\_box\_has\_crashed = false;
/\* defining a struct \*/
struct Vector {
 public double x;
 public double y;
 public double z;
}
/\* defining an enum \*/
enum WindowType {
 TOPLEVEL,
 POPUP
}

Most of these types may have different sizes on different platforms, except for the guaranteed-size integer types. The sizeof operator returns the size that a variable of a given type occupies in bytes:

ulong nbytes = sizeof(int32);    // nbytes will be 4 (= 32 bits)

You can determine the minimum and maximum values of a numerical type with _.MIN_ and _.MAX_, e.g. int.MIN and int.MAX.

#### Strings

The data type for strings is string. Vala strings are UTF-8 encoded and immutable.

string text = "A string literal";

Vala offers a feature called _verbatim strings_. These are strings in which escape sequences (such as \\n) won't be interpreted, line breaks will be preserved and quotation marks don't have to be masked. They are enclosed with triple double quotation marks. Possible indentations after a line break are part of the string as well.

string verbatim = """This is a so-called "verbatim string".
Verbatim strings don't process escape sequences, such as \\n, \\t, \\\\, etc.
They may contain quotes and may span multiple lines.""";

Strings prefixed with '@' are string templates. They can evaluate embedded variables and expressions prefixed with '$':

int a = 6, b = 7;
string s = @"$a \* $b = $(a \* b)";  // => "6 \* 7 = 42"

The equality operators \== and != compare the content of two strings, contrary to Java's behaviour which in this case would check for referential equality.

You can slice a string with \[start:end\]. Negative values represent positions relative to the end of the string:

string greeting = "hello, world";
string s1 = greeting\[7:12\];        // => "world"
string s2 = greeting\[-4:-2\];       // => "or"

Note that indices in Vala start with 0 as in most other programming languages. Starting with Vala 0.11 you can access a single byte of a string with \[index\]:

uint8 b = greeting\[7\];             // => 0x77

However, you cannot assign a new byte value to this position, since Vala strings are immutable.

Many of the basic types have reasonable methods for parsing from and converting to strings, for example:

bool b = bool.parse("false");           // => false
int i = int.parse("\-52");               // => -52
double d = double.parse("6.67428E-11"); // => 6.67428E-11
string s1 = true.to\_string();           // => "true"
string s2 = 21.to\_string();             // => "21"

Two useful methods for writing and reading strings to/from the console (and for your first explorations with Vala) are _stdout.printf()_ and _stdin.read\_line()_:

stdout.printf("Hello, world\\n");
stdout.printf("%d %g %s\\n", 42, 3.1415, "Vala");
string input = stdin.read\_line();
int number = int.parse(stdin.read\_line());

You already know _stdout.printf()_ from the _Hello World_ example. Actually, it can take an arbitrary number of arguments of different types, whereas the first argument is a _format string_, following the same rules as [C format strings](http://en.wikipedia.org/wiki/Printf). If you must output an error message you can use _stderr.printf()_ instead of _stdout.printf()_.

In addition the _in_ operation can be used to determine whether one string contains another, e.g.

if ("ere" in "Able was I ere I saw Elba.") ...

For more information, please report to [the complete overview of the string class](http://www.valadoc.org/glib-2.0/string.html).

A [sample program](https://wiki.gnome.org/Projects/Vala/StringSample) demonstrating string usage is also available.

#### Arrays

An array is declared by giving a type name followed by \[\] and created by using the new operator e.g. int\[\] a = new int\[10\] to create an array of integers. The length of such an array can be obtained by the _length_ member variable e.g. int count = a.length. Note that if you write Object\[\] a = new Object\[10\] no objects will be created, just the array to store them in.

int\[\] a = new int\[10\];
int\[\] b = { 2, 4, 6, 8 };

You can slice an array with \[start:end\]:

int\[\] c = b\[1:3\];     // => { 4, 6 }

Slicing an array will result in a reference to the requested data, not a copy. However, assigning the slice to an owned variable (as is done above) will result in a copy. If you would like to avoid a copy, you must either assign the slice to an unowned array or pass it directly to an argument (arguments are, by default, unowned):

unowned int\[\] c = b\[1:3\];     // => { 4, 6 }

Multi-dimensional arrays are defined with \[,\] or \[,,\] etc.

int\[,\] c = new int\[3,4\];
int\[,\] d = {{2, 4, 6, 8},
 {3, 5, 7, 9},
 {1, 3, 5, 7}};
d\[2,3\] = 42;

This sort of array is represented by a single contiguous memory block. Jagged multi-dimensional arrays (\[\]\[\], also known as "stacked arrays" or "arrays of arrays"), where each row may have a different length, are not yet supported.

To find the length of each dimension in a multi-dimensional array, the _length_ member becomes an array, storing the length of each respective dimension.

int\[,\] arr = new int\[4,5\];
int r = arr.length\[0\];
int c = arr.length\[1\];

Please note that you can't get a mono-dimensional array from a multidimensional array, or even slice a multidimensional array:

int\[,\] arr = {{1,2},
 {3,4}};
int\[\] b = arr\[0\];  // won't work
int\[\] c = arr\[0,\];  // won't work
int\[\] d = arr\[:,0\];  // won't work
int\[\] e = arr\[0:1,0\];  // won't work
int\[,\] f = arr\[0:1,0:1\];  // won't work

You can append array elements dynamically with the += operator. However, this works only for locally defined or private arrays. The array is automatically reallocated if needed. Internally this reallocation happens with sizes growing in powers of 2 for run-time efficiency reasons. However, .length holds the actual number of elements, not the internal size.

int\[\] e = {};
e += 12;
e += 5;
e += 37;

You can resize an array by calling _resize()_ on it. It will keep the original content (as much as fits).

int\[\] a = new int\[5\];
a.resize(12);

You can move elements within an array by calling _move(src, dest, length)_ on it. The original positions will be filled with 0.

uint8\[\] chars = "hello world".data;
chars.move (6, 0, 5);
print ((string) chars); // "world "

If you put the square brackets _after_ the identifier together with an indication of size you will get a fixed-size array. Fixed-size arrays are allocated on the stack (if used as local variables) or in-line allocated (if used as fields) and you can't reallocate them later.

int f\[10\];     // no 'new ...'

Vala does not do any bounds checking for array access at runtime. If you need more safety you should use a more sophisticated data structure like an _ArrayList_. You will learn more about that later in the section about _collections_.

#### Reference Types

The reference types are all types declared as a class, regardless of whether they are descended from GLib's _Object_ or not. Vala will ensure that when you pass an object by reference the system will keep track of the number of references currently alive in order to manage the memory for you. The value of a reference that does not point anywhere is null. More on classes and their features in the section about object oriented programming.

/\* defining a class \*/
class Track : GLib.Object {             /\* subclassing 'GLib.Object' \*/
 public double mass;                 /\* a public field \*/
 public double name { get; set; }    /\* a public property \*/
 private bool terminated = false;    /\* a private field \*/
 public void terminate() {           /\* a public method \*/
 terminated = true;
 }
}

#### Static Type Casting

In Vala, you can cast a variable from one type to another. For a static type cast, a variable is casted by the desired type name with parenthesis. A static cast doesn't impose any runtime type safety checking. It works for all Vala types. For example,

int i = 10;
float j = (float) i;

Vala supports another casting mechanism called _dynamic cast_ which performs runtime type checking and is described in the section about object oriented programming.

#### Type Inference

Vala has a mechanism called _type inference_, whereby a local variable may be defined using var instead of giving a type, so long as it is unambiguous what type is meant. The type is inferred from the right hand side of the assignment. It helps reduce unnecessary redundancy in your code without sacrificing static typing:

var p = new Person();     // same as: Person p = new Person();
var s = "hello";          // same as: string s = "hello";
var l = new List<int\>();  // same as: List<int> l = new List<int>();
var i = 10;               // same as: int i = 10;

This only works for local variables. Type inference is especially useful for types with generic type arguments (more on these later). Compare

MyFoo<string, MyBar<string, int\>> foo = new MyFoo<string, MyBar<string, int\>>();

vs.

var foo = new MyFoo<string, MyBar<string, int\>>();

#### Defining new Type from other

Defining a new type is a matter of derive it from the one you need. Here is an example:

defining an alias for a basic type (equivalent to typedef int Integer in C)\*/ \[[SimpleType](https://wiki.gnome.org/SimpleType)\] public struct Integer : uint { }

/\* Define a new type from a container like GLib.List with elements type GLib.Value \*/
public class ValueList : GLib.List<GLib.Value\> {
 \[CCode (has\_construct\_function = false)\]
 protected ValueList ();
 public static GLib.Type get\_type ();
}

### Operators

\=

assignment. The left operand must be an identifier, and the right must result in a value or reference as appropriate.

+, -, /, \*, %

basic arithmetic, applied to left and right operands. The + operator can also concatenate strings.

+=, -=, /=, \*=, %=

arithmetic operation between left and right operands, where the left must be an identifier, to which the result is assigned.

++, --

increment and decrement operations with implicit assignment. These take just one argument, which must be an identifier of a simple data type. The value will be changed and assigned back to the identifier. These operators may be placed in either prefix or postfix positions - with the former the evaluated value of the statement will be the newly calculated value, with the latter the original value is returned.

|, ^, &, ~, |=, &=, ^=

bitwise operations: or, exclusive or, and, not. The second set include assignment and are analogous to the arithmetic versions. These can be applied to any of the simple value types. (There is of no assignment operator associated with ~ because this is a unary operator. The equivalent operation is just a = ~a).

<<, >>

bit shift operations, shifting the left operand a number of bits according the right operand.

<<=, >>=

bit shift operations, shifting the left operand a number of bits according the right operand. The left operand must be an identifier, to which the result is assigned.

\==

equality test. Evaluates to a bool value dependent on whether the left and right operands are equal. In the case of value types this means their values are equal, in the case of reference types that the objects are the same instance. An exception to this rule is the string type, which is tested for equality by value.

<, >, >=, <=, !=

inequality tests. Evaluate to a bool value dependent on whether the left and right operands are different in the manner described. These are valid for simple value data types, and the string type. For strings these operators compare the lexicographical order.

!, &&, ||

logic operations: not, and, or. These operations can be applied to Boolean values - the first taking just one value the others two.

? :

ternary conditional operator. Evaluates a condition and returns either the value of the left or the right sub-expression based on whether the condition is true or false: _condition_ ? _value if true_ : _value if false_

??

null coalescing operator: a ?? b is equivalent to a != null ? a : b. This operator is useful for example to provide a default value in case a reference is _null_:

stdout.printf("Hello, %s!\\n", name ?? "unknown person");

in

checks if the right operand contains the left operand. This operator works on arrays, strings, collections or any other type that has an appropriate _contains()_ method. For strings it performs a substring search.

Operators cannot be overloaded in Vala. There are extra operators that are valid in the context of lambda declarations and other specific tasks - these are explained in the context they are applicable.

### Control Structures

while (a > b) { a\--; }

will decrement _a_ repeatedly, checking before each iteration that _a_ is greater than _b_.

do { a\--; } while (a > b);

will decrement _a_ repeatedly, checking after each iteration that _a_ is greater than _b_.

for (int a = 0; a < 10; a++) { stdout.printf("%d\\n", a); }

will initialize _a_ to 0, then print _a_ repeatedly until _a_ is no longer less than 10, incrementing _a_ after each iteration.

foreach (int a in int\_array) { stdout.printf("%d\\n", a); }

will print out each integer in an array, or another iterable collection. The meaning of "iterable" will be described later.

All of the four preceding types of loop may be controlled with the keywords break and continue. A break instruction will cause the loop to immediately terminate, while continue will jump straight to the test part of the iteration.

if (a > 0) { stdout.printf("a is greater than 0\\n"); }
else if (a < 0) { stdout.printf("a is less than 0\\n"); }
else { stdout.printf("a is equal to 0\\n"); }

executes a particular piece of code based on a set of conditions. The first condition to match decides which code will execute, if _a_ is greater than 0 it will not be tested whether it is less than 0. Any number of else if blocks is allowed, and zero or one else blocks.

switch (a) {
case 1:
 stdout.printf("one\\n");
 break;
case 2:
case 3:
 stdout.printf("two or three\\n");
 break;
default:
 stdout.printf("unknown\\n");
 break;
}

A switch statement runs exactly one or zero sections of code based on the value passed to it. In Vala there is no fall through between cases, except for empty cases. In order to ensure this, each non-empty case must end with a break, return or throw statement. It is possible to use switch statements with strings.

A note for C programmers: conditions must always evaluate to a Boolean value. This means that if you want to check a variable for null or 0 you must do this explicitly: if (object != null) { } or if (number != 0) { }.

### Language Elements

#### Methods

Functions are called _methods_ in Vala, regardless of whether they are defined inside a class or not. From now on we will stick to the term _method_.

int method\_name(int arg1, Object arg2) {
 return 1;
}

This code defines a method, having the name _method\_name_, taking two arguments, one an integer and the other an _Object_ (the first passed by value, the second as a reference as described). The method will return an integer, which in this case is 1.

All Vala methods are C functions, and therefore take an arbitrary number of arguments and return one value (or none if the method is declared _void_). They may approximate more return values by placing data in locations known to the calling code. Details of how to do this are in the "Parameter Directions" section in the advanced part of this tutorial.

The naming convention for methods in Vala is _all\_lower\_case_ with underscores as word separators. This may be a little bit unfamiliar to C# or Java programmers who are accustomed to _CamelCase_ or _mixedCamelCase_ method names. But with this style you will be consistent with other Vala and C/GObject libraries.

It is not possible to have multiple methods with the same name but different signature within the same scope ("method overloading"):

void draw(string text) { }
void draw(Shape shape) { }  // not possible

This is due to the fact that libraries produced with Vala are intended to be usable for C programmers as well. In Vala you would do something like this instead:

void draw\_text(string text) { }
void draw\_shape(Shape shape) { }

By choosing slightly different names you can avoid a name clash. In languages that support method overloading it is often used for providing convenience methods with less parameters that chain up to the most general method:

void f(int x, string s, double z) { }
void f(int x, string s) { f(x, s, 0.5); }  // not possible
void f(int x) { f(x, "hello"); }           // not possible

In this case you can use Vala's default argument feature for method parameters in order to achieve a similar behaviour with just one method. You can define default values for the last parameters of a method, so that you don't have to pass them explicitly to a method call:

void f(int x, string s = "hello", double z = 0.5) { }

Some possible calls of this method might be:

f(2);
f(2, "hi");
f(2, "hi", 0.75);

It's even possible to define methods with real variable-length argument lists (_varargs_) like _stdout.printf()_, although not necessarily recommended. You will learn how to do that later.

Vala performs a basic nullability check on the method parameters and return values. If it is allowable for a method parameter or a return value to be null, the type symbol should be postfixed with a ? modifier. This extra information helps the Vala compiler to perform static checks and to add runtime assertions on the preconditions of the methods, which may help in avoiding related errors such as dereferencing a null reference.

string? method\_name(string? text, Foo? foo, Bar bar) {
 // ...
}

In this example text, foo and the return value may be null, however, bar must not be null.

#### Delegates

delegate void DelegateType(int a);

Delegates represent methods, allowing chunks of code to be passed around like objects. The example above defines a new type named _DelegateType_ which represents methods taking an _int_ and not returning a value. Any method that matches this signature may be assigned to a variable of this type or passed as a method argument of this type.

delegate void DelegateType(int a);
void f1(int a) {
 stdout.printf("%d\\n", a);
}
void f2(DelegateType d, int a) {
 d(a);       // Calling a delegate
}
void main() {
 f2(f1, 5);  // Passing a method as delegate argument to another method
}

This code will execute the method _f2_, passing in a reference to method _f1_ and the number 5. _f2_ will then execute the method _f1_, passing it the number.

Delegates may also be created locally. A member method can also be assigned to a delegate, e.g,

class Foo {
 public void f1(int a) {
 stdout.printf("a = %d\\n", a);
 }
 delegate void DelegateType(int a);
 public static int main(string\[\] args) {
 Foo foo = new Foo();
 DelegateType d1 = foo.f1;
 d1(10);
 return 0;
 }
}

#### Anonymous Methods / Closures

(a) => { stdout.printf("%d\\n", a); }

An _anonymous method_, also known as _lambda expression_, _function literal_ or _closure_, can be defined in Vala with the \=> operator. The parameter list is on the left hand side of the operator, the method body on the right hand side.

An anonymous method standing by itself like the one above does not make much sense. It is only useful if you assign it directly to a variable of a delegate type or pass it as a method argument to another method.

Notice that neither parameter nor return types are explicitly given. Instead the types are inferred from the signature of the delegate it is used with.

Assigning an anonymous method to a delegate variable:

delegate void PrintIntFunc(int a);
void main() {
 PrintIntFunc p1 = (a) => { stdout.printf("%d\\n", a); };
 p1(10);
 // Curly braces are optional if the body contains only one statement:
 PrintIntFunc p2 = (a) => stdout.printf("%d\\n", a);
 p2(20);
}

Passing an anonymous method to another method:

delegate int Comparator(int a, int b);
void my\_sorting\_algorithm(int\[\] data, Comparator compare) {
 // ... 'compare' is called somewhere in here ...
}
void main() {
 int\[\] data = { 3, 9, 2, 7, 5 };
 // An anonymous method is passed as the second argument:
 my\_sorting\_algorithm(data, (a, b) => {
 if (a < b) return -1;
 if (a > b) return 1;
 return 0;
 });
}

Anonymous methods are real [closures](http://en.wikipedia.org/wiki/Closure_(computer_science)). This means you can access the local variables of the outer method within the lambda expression:

delegate int IntOperation(int i);
IntOperation curried\_add(int a) {
 return (b) => a + b;  // 'a' is an outer variable
}
void main() {
 stdout.printf("2 + 4 = %d\\n", curried\_add(2)(4));
}

In this example _curried\_add_ (see [Currying](http://en.wikipedia.org/wiki/Currying)) returns a newly created method that preserves the value of _a_. This returned method is directly called afterwards with 4 as argument resulting in the sum of the two numbers.

#### Namespaces

namespace NameSpaceName {
 // ...
}

Everything between the braces in this statement is in the namespace _NameSpaceName_ and must be referenced as such. Any code outside this namespace must either use qualified names for anything within the name of the namespace, or be in a file with an appropriate using declaration in order to import this namespace:

using NameSpaceName;
// ...

For example, if the namespace _Gtk_ is imported with using Gtk; you can simply write _Window_ instead of _Gtk.Window_. A fully qualified name would only be necessary in case of ambiguity, for example between _GLib.Object_ and _Gtk.Object_.

The namespace _GLib_ is imported by default. Imagine an invisible using GLib; line at the beginning of every Vala file.

Everything that you don't put into a separate namespace will land in the anonymous global namespace. If you have to reference the global namespace explicitly due to ambiguity you can do that with the global:: prefix.

Namespaces can be nested, either by nesting one declaration inside another, or by giving a name of the form _NameSpace1.NameSpace2_.

Several other types of definition can declare themselves to be inside a namespace by following the same naming convention, e.g. class NameSpace1.Test { ... }. Note that when doing this, the final namespace of the definition will be the one the declaration is nested in plus the namespaces declared in the definition.

#### Structs

struct StructName {
 public int a;
}

defines a struct type, i.e. a compound value type. A Vala struct may have methods in a limited way and also may have private members, meaning the explicit public access modifier is required.

struct Color {
 public double red;
 public double green;
 public double blue;
}

This is how you can initialise a struct:

// without type inference
Color c1 = Color();  // or Color c1 = {};
Color c2 = { 0.5, 0.5, 1.0 };
Color c3 = Color() {
 red = 0.5,
 green = 0.5,
 blue = 1.0
};
// with type inference
var c4 = Color();
var c5 = Color() {
 red = 0.5,
 green = 0.5,
 blue = 1.0
};

Structs are stack/inline allocated and copied on assignment.

To define an array of structs, please see the [FAQ](https://wiki.gnome.org/Projects/Vala/FAQ#How_do_I_create_an_array_of_structs.3F).

#### Classes

class ClassName : SuperClassName, InterfaceName {
}

defines a class, i.e. a reference type. In contrast to structs, instances of classes are heap allocated. There is much more syntax related to classes, which is discussed more fully in the section about object oriented programming.

#### Interfaces

interface InterfaceName : SuperInterfaceName {
}

defines an interface, i.e. a non instantiable type. In order to create an instance of an interface you must first implement its abstract methods in a non-abstract class. Vala interfaces are more powerful than Java or C# interfaces. In fact, they can be used as [mixins](http://en.wikipedia.org/wiki/Mixin). The details of interfaces are described in the section about object oriented programming.

### Code Attributes

Code attributes instruct the Vala compiler details about how the code is supposed to work on the target platform. Their syntax is \[AttributeName\] or \[AttributeName(param1 = value1, param2 = value2, ...)\].

They are mostly used for bindings in _vapi_ files, \[CCode(...)\] being the most prominent attribute here. Another example is the \[DBus(...)\] attribute for exporting remote interfaces via [D-Bus](http://www.freedesktop.org/wiki/Software/dbus).

Object Oriented Programming
---------------------------

Although Vala doesn't force you to work with objects, some features are not available any other way. As such, you will certainly want to program in an object-oriented style most of the time. As with most current languages, in order to define your own object types, you write a class definition.

A class definition states what data each object of its type has, what other object types it can hold references to, and what methods can be executed on it. The definition can include a name of another class which the new one should be a subclass of. An instance of a class is also an instance of all it's class's super classes, as it inherits from them all their methods and data, although it may not be able to access all of this itself. A class may also implement any number of interfaces, which are sets of method definitions that must be implemented by the class - an instance of a class is also an instance of each interface implemented by its class or super classes.

Classes in Vala may also have "static" members. This modifier allows either data or methods to be defined as belonging to the class as a whole, rather than to a specific instance of it. Such members can be accessed without possessing an instance of the class.

### Basics

A simple class may be defined as follows:

public class TestClass : GLib.Object {
 /\* Fields \*/
 public int first\_data = 0;
 private int second\_data;
 /\* Constructor \*/
 public TestClass() {
 this.second\_data = 5;
 }
 /\* Method \*/
 public int method\_1() {
 stdout.printf("private data: %d", this.second\_data);
 return this.second\_data;
 }
}

This code will define a new type (which is registered automatically with the _gobject_ library's type system) that contains three members. There are two data members, the integers defined at the top, and one method called _method\_1_, which returns an integer. The class declaration states that this class is a subclass of _GLib.Object_, and therefore instances of it are also _Objects_, and contain all the members of that type also. The fact that this class is descended from _Object_ also means that there are special features of Vala that can be used to easily access some of _Object's_ features.

This class is described as public (by default, classes are internal). The implication of this is that it can referenced directly by code outside of this file - if you are a C programmer of glib/gobject, you will recognise this as being equivalent to defining the class interfaces in a header file that other code can include.

The members are also all described as either public or private. The member _first\_data_ is public, so it is visible directly to any user of the class, and can be modified without the containing instance being aware of it. The second data member is private, and so can only be referenced by code belonging to this class. Vala supports four different access modifiers:

public

No restrictions to access

private

Access is limited to within the class/struct definition. This is the default if no access modifier is specified

protected

Access is limited to within the class definition and any class that inherits from the class

internal

Access is limited exclusively to classes defined within the same package

The constructor initialises new instances of a class. It has the same name as the class, may take zero or more arguments and is defined without return type.

The final part of this class is a method definition. This method is to be called _method\_1_, and it will return an integer. As this method is not static, it can only be executed on an instance of this class, and may therefore access members of that instance. It can do this through the this reference, which always points to the instance the method is being called on. Unless there is an ambiguity, the this identifier can be omitted if wished.

You can use this new class as follows:

TestClass t = new TestClass();
t.first\_data = 5;
t.method\_1();

### Construction

Vala supports two slightly different construction schemes: the Java/C#-style construction scheme which we will focus on for now, and the GObject-style construction scheme which will be described in a section at the end of the chapter.

Vala does not support constructor overloading for the same reasons that method overloading is not allowed, which means a class may not have multiple constructors with the same name. However, this is no problem because Vala supports _named constructors_. If you want to offer multiple constructors you may give them different name additions:

public class Button : Object {
 public Button() {
 }
 public Button.with\_label(string label) {
 }
 public Button.from\_stock(string stock\_id) {
 }
}

Instantiation is analogous:

new Button();
new Button.with\_label("Click me");
new Button.from\_stock(Gtk.STOCK\_OK);

You may chain constructors via this() or this._name\_extension_():

public class Point : Object {
 public double x;
 public double y;
 public Point(double x, double y) {
 this.x = x;
 this.y = y;
 }
 public Point.rectangular(double x, double y) {
 this(x, y);
 }
 public Point.polar(double radius, double angle) {
 this.rectangular(radius \* Math.cos(angle), radius \* Math.sin(angle));
 }
}
void main() {
 var p1 = new Point.rectangular(5.7, 1.2);
 var p2 = new Point.polar(5.7, 1.2);
}

### Destruction

Although Vala manages the memory for you, you might need to add your own destructor if you choose to do manual memory management with pointers (more on that later) or if you have to release other resources. The syntax is the same as in C# and C++:

class Demo : Object {
 ~Demo() {
 stdout.printf("in destructor");
 }
}

Since Vala's memory management is based on _reference counting_ instead of _tracing garbage collection_, destructors are deterministic and can be used to implement the [RAII](http://en.wikipedia.org/wiki/RAII) pattern for resource management (closing streams, database connections, ...).

### Signals

Signals are a system provided by the Object class in GLib, and made easily accessible by Vala to all descendants of Object. A signal is recognisable to C# programmers as an event, or to Java programmers as an alternative way of implementing event listeners. In short, a signal is simply a way of executing an arbitrary number of externally identical methods (i.e. ones with the same signature) at approximately the same time. The actual methods of execution are internal to _gobject_, and not important to Vala programs.

A signal is defined as a member of a class, and appears similar to a method with no body. Signal handlers can then be added to the signal using the connect() method. In order to dive right in at the deep end, the following example also introduces lambda expressions, a very useful way to write signal handling code in Vala:

public class Test : GLib.Object {
 public signal void sig\_1(int a);
 public static int main(string\[\] args) {
 Test t1 = new Test();
 t1.sig\_1.connect((t, a) => {
 stdout.printf("%d\\n", a);
 });
 t1.sig\_1(5);
 return 0;
 }
}

This code introduces a new class called "Test", using familiar syntax. The first member of this class is a signal, called "sig\_1", which is defined as passing an integer. In the main method of this program, we first create a Test instance - a requirement since signals always belong to instances of classes. Next, we assign to our instance's "sig\_1" signal a handler, which we define inline as a lambda expression. The definition states that the method will receive two arguments which we call "t" and "a", but do not provide types for. We can be this terse because Vala already knows the definition of the signal and can therefore understand what types are required.

The reason there are two parameters to the handler is that whenever a signal is emitted, the object on which it is emitted is passed as the first argument to the handler. The second argument is that one that the signal says it will provide.

Finally, we get impatient and decide to emit a signal. We do this by calling the signal as though it was a method of our class, and allow gobject to take care of forwarding the message to all attached handlers. Understanding the mechanism used for this is not required to use signals from Vala.

NB: Currently the public access modifier is the only possible option - all signals can be both connected to and emitted by any piece of code.

Note: Since April 2010 signals can be annotated with any combination of flags:

 \[Signal (action\=true, detailed\=true, run\=true, no\_recurse\=true, no\_hooks\=true)\]
 public signal void sig\_1 ();

### Properties

It is good object oriented programming practice to hide implementation details from the users of your classes ([information hiding principle](http://en.wikipedia.org/wiki/Information_hiding)), so you can later change the internals without breaking the public API. One practice is to make fields private and provide accessor methods for getting and setting their values (getters and setters).

If you're a Java programmer you will probably think of something like this:

class Person : Object {
 private int age = 32;
 public int get\_age() {
 return this.age;
 }
 public void set\_age(int age) {
 this.age = age;
 }
}

This works, but Vala can do better. The problem is that these methods are cumbersome to work with. Let's suppose that you want to increase the age of a person by one year:

var alice = new Person();
alice.set\_age(alice.get\_age() + 1);

This is where properties come into play:

class Person : Object {
 private int \_age = 32;  // underscore prefix to avoid name clash with property
 /\* Property \*/
 public int age {
 get { return \_age; }
 set { \_age = value; }
 }
}

This syntax should be familiar to C# programmers. A property has a get and a set block for getting and setting its value. value is a keyword that represents the new value that should be assigned to the property.

Now you can access the property as if it was a public field. But behind the scenes the code in the get and set blocks is executed.

var alice = new Person();
alice.age = alice.age + 1;  // or even shorter:
alice.age++;

If you only do the standard implementation as shown above then you can write the property even shorter:

class Person : Object {
 /\* Property with standard getter and setter and default value \*/
 public int age { get; set; default = 32; }
}

With properties you can change the internal working of classes without changing the public API. For example:

static int current\_year = 2525;
class Person : Object {
 private int year\_of\_birth = 2493;
 public int age {
 get { return current\_year - year\_of\_birth; }
 set { year\_of\_birth = current\_year - value; }
 }
}

This time the age is calculated on the fly from the year of birth. Note that you can do more than just simple variable access or assignment within the get and set blocks. You could do a database access, logging, cache updates, etc.

If you want to make a property read-only for the users of the class you should make the setter private:

 public int age { get; private set; default = 32; }

Or, alternatively, you can leave out the set block:

class Person : Object {
 private int \_age = 32;
 public int age {
 get { return \_age; }
 }
}

Properties may not only have a name but also a short description (called _nick_) and a long description (called _blurb_). You can annotate these with a special attribute:

 \[Description(nick = "age in years", blurb = "This is the person's age in years")\]
 public int age { get; set; default = 32; }

Properties and their additional descriptions can be queried at runtime. Some programs such as the [Glade](http://glade.gnome.org/) graphical user interface designer make use of this information. In this way Glade can present human readable descriptions for properties of GTK+ widgets.

Every instance of a class derived from GLib.Object has a signal called notify. This signal gets emitted every time a property of its object changes. So you can connect to this signal if you're interested in change notifications in general:

obj.notify.connect((s, p) => {
 stdout.printf("Property '%s' has changed!\\n", p.name);
});

s is the source of the signal (obj in this example), p is the property information of type _ParamSpec_ for the changed property. If you're only interested in change notifications of a single property you can use this syntax:

alice.notify\["age"\].connect((s, p) => {
 stdout.printf("age has changed\\n");
});

Note that in this case you must use the string representation of the property name where underscores are replaced by dashes: my\_property\_name becomes "my-property-name" in this representation, which is the GObject property naming convention.

Change notifications can be disabled with a CCode attribute tag immediately before the declaration of the property:

public class MyObject : Object {
 \[CCode(notify = false)\]
 // notify signal is NOT emitted upon changes in the property
 public int without\_notification { get; set; }
 // notify signal is emitted upon changes in the property
 public int with\_notification { get; set; }
}

There's another type of properties called _construct properties_ that are described later in the section about gobject-style construction.

Note: in case your property is type of struct, to get the property value with Object.get(), you have to declare your variable as example below

struct Color
{
 public uint32 argb;
 public Color() { argb = 0x12345678; }
}
class Shape: GLib.Object
{
 public Color c { get; set; default = Color(); }
}
int main()
{
 Color? c = null;
 Shape s = new Shape();
 s.get("c", out c);
}

This way, c is an reference instead of an instance of Color on stack. What you passed into s.get() is "Color \*\*" instead of "Color \*".

### Inheritance

In Vala, a class may derive from one or zero other classes. In practice this is always likely to be one, although there is no implicit inheritance as there is in languages like Java.

When defining a class that inherits from another, you create a relationship between the classes where instances of the subclass are also instances of the superclass. This means that operations on instances of the superclass are also applicable on instances of the subclass. As such, wherever an instance of the superclass is required, an instance of the subclass can be substituted.

When writing the definition of a class it is possible to exercise precise control over who can access what methods and data in the object. The following example demonstrates a range of these options:

class SuperClass : GLib.Object {
 private int data;
 public SuperClass(int data) {
 this.data = data;
 }
 protected void protected\_method() {
 }
 public static void public\_static\_method() {
 }
}
class SubClass : SuperClass {
 public SubClass() {
 base(10);
 }
}

_data_ is an instance data member of _SuperClass_. There will be a member of this type in every instance of _SuperClass_, and it is declared private so will only be accessible by code that is a part of _SuperClass_.

_protected\_method_ is an instance method of _SuperClass_. You will be able to execute this method only an instance of _SuperClass_ or of one of its subclasses, and only from code that belongs to _SuperClass_ or one of its subclasses - this latter rule being the result of the protected modifier.

_public\_static\_method_ has two modifiers. The static modifier means that this method may be called without owning an instance of _SuperClass_ or of one of its subclasses. As a result, this method will not have access to a this reference when it is executed. The public modifier means that this method can be called from any code, no matter its relationship with _SuperClass_ or its subclasses.

Given these definitions, an instance of _SubClass_ will contain all three members of _SuperClass_, but will only be able to access the non-private members. External code will only be able to access the public method.

With base a constructor of a subclass can chain up to a constructor of its base class.

### Abstract Classes

There is another modifier for methods, called abstract. This modifier allows you to describe a method that is not actually implemented in the class. Instead, it must be implemented by subclasses before it can be called. This allows you to define operations that can be called on all instances of a type, whilst ensuring that all more specific types provide their own version of the functionality.

A class containing abstract methods must be declared abstract as well. The result of this is to prevent any instantiation of the type.

public abstract class Animal : Object {
 public void eat() {
 stdout.printf("\*chomp chomp\*\\n");
 }
 public abstract void say\_hello();
}
public class Tiger : Animal {
 public override void say\_hello() {
 stdout.printf("\*roar\*\\n");
 }
}
public class Duck : Animal {
 public override void say\_hello() {
 stdout.printf("\*quack\*\\n");
 }
}

The implementation of an abstract method must be marked with override. Properties may be abstract as well.

#### Virtual Methods

A virtual method allows to define default implementations to abstract classes and allows to derived classes to override its behavior, this is different than hiding methods.

public abstract class Caller : GLib.Object {
 public abstract string name { get; protected set; }
 public abstract void update (string new\_name);
 public virtual bool reset ()
 {
 name = "No Name";
 return true;
 }
}
public class ContactCV : Caller
{
 public override string name { get; protected set; }
 public override void update (string new\_name)
 {
 name = "ContactCV - " + new\_name;
 }
 public override bool reset ()
 {
 name = "ContactCV-Name";
 stdout.printf ("CotactCV.reset () implementation!\\n");
 return true;
 }
}
public class Contact : Caller {
 public override string name { get; protected set; }
 public override void update (string new\_name)
 {
 name = "Contact - " + new\_name;
 }
 
 public static void main ()
 {
 var c = new Contact ();
 c.update ("John Strauss");
 stdout.printf(@"Name: $(c.name)\\n");
 c.reset ();
 stdout.printf(@"Reset Name: $(c.name)\\n");
 
 var cv = new ContactCV ();
 cv.update ("Xochitl Calva");
 stdout.printf(@"Name: $(cv.name)\\n");
 cv.reset ();
 stdout.printf(@"Reset Name: $(cv.name)\\n");
 stdout.printf("END\\n");
 }
}

As you can see in the above example, Caller is an abstract class defining both an abstract property and a method, but adds a virtual method which can be overridden by derived classes. Contact class implements abstract methods and properties of Caller, while using the default implementation for reset() by avoiding to define a new one. ContactCV class implements all abstract definitions on Caller, but overrides reset() so as to define its own implementation.

### Interfaces

A class in Vala may implement any number of interfaces. Each interface is a type, much like a class, but one that cannot be instantiated. By "implementing" one or more interfaces, a class may declare that its instances are also instances of the interface, and therefore may be used in any situation where an instance of that interface is expected.

The procedure for implementing an interface is the same as for inheriting from classes with abstract methods in - if the class is to be useful it must provide implementations for all methods that are described but not yet implemented.

A simple interface definition looks like:

public interface ITest : GLib.Object {
 public abstract int data\_1 { get; set; }
 public abstract void method\_1();
}

This code describes an interface "ITest" which requires GLib.Object as parent of the implementor class and contains two members. "data\_1" is a property, as described above, except that it is declared abstract. Vala will therefore not implement this property, but instead require that classes implementing this interface have a property called "data\_1" that has both get and set accessors - it is required that this be abstract as an interface may not have any data members. The second member "method\_1" is a method. Here it is declared that this method must be implemented by classes that implement this interface.

The simplest possible full implementation of this interface is:

public class Test1 : GLib.Object, ITest {
 public int data\_1 { get; set; }
 public void method\_1() {
 }
}

And may be used as follows:

var t = new Test1();
t.method\_1();
ITest i = t;
i.method\_1();

#### Defining Prerequisites

Interfaces in Vala may not inherit from other interfaces, but they may declare other interfaces to be prerequisites, which works in roughly the same way. For example, it may be desirable to say that any class that implements a List interface must also implement a Collection and Traversable interfaces. The syntax for this is exactly the same as for describing interface implementation in classes:

public interface List : Collection, Traversable {
}

This definition of "List" may not be implemented in a class without "Collection" also being implemented, and so Vala enforces the following style of declaration for a class wishing to implement "List", where all implemented interfaces must be described:

public class ListClass : GLib.Object, Collection, List {
}

Vala interfaces may also have a class as a prerequisite. If a class name is given in the list of prerequisites, the interface may only be implemented in classes that derive from that prerequisite class. This is often used to ensure that an instance of an interface is also a GLib.Object subclass, and so the interface can be used, for example, as the type of a property.

The fact that interfaces can not inherit from other interfaces is mostly only a technical distinction - in practice Vala's system works the same as other languages in this area, but with the extra feature of prerequisite classes.

#### Defining default implementation in methods

There's another important difference between Vala interfaces and Java/C# interfaces: Vala interfaces may have non-abstract methods.

Vala actually allows method implementations in interfaces, then a method with a default implementation must be declared as virtual. Due to this fact Vala interfaces can act as [mixins](http://en.wikipedia.org/wiki/Mixins). This is a restricted form of multiple inheritance.

public interface Callable : GLib.Object {
 public abstract bool answering { get; protected set; }
 public abstract void answer ();
 public virtual bool hang ()
 {
 answering = false;
 return true;
 }
}

Interface Callable defines an abstract property called answering, where any class implementing this interface can monitor the state of a call, details about answer a call is a mautter of the implementator, but hang defines a default implementation to set answering to false when hanging a call.

public class Phone : GLib.Object, Callable {
 public bool answering { get; protected set; }
 public void answer ()
 {
 /\* answer code implementation \*/
 }
 
 public static void main ()
 {
 var f = new Phone ();
 if (f.hang ())
 stdout.printf("Hand done.\\n");
 else
 stdout.printf("Hand Error!\\n");
 stdout.printf("END\\n");
 }
}

When compiling and running, you will find that Phone class actually no implements Callable.hang() method, but it is able to use it, then the result is a message Hang done.

public class TechPhone : GLib.Object, Callable
{
 public bool answering { get; protected set; }
 public void answer ()
 {
 /\* answer code implementation \*/
 }
 public bool hang ()
 {
 answering = false;
 stdout.printf ("TechPhone.hang () implementation!");
 return false;
 }
}

In this case TechPhone is another implementation to Callable, then when hang() method is called on an instance of TechPhone it will always return false and print the message TechPhone.hang () implementation!, hidding completelly Callable.hang() default implementation.

#### Properties

An interface can define properties that must be implemented for classes. Implementator class must define a property with the same signature and access permissions to the property's get and set.

As any GObject property, you can define a body to property's set and get in the implementator class, when no body is used values are set and get by default. If given, you must define a private field to store the properties values to be used outside or inside the class.

Callable interface definition, defines an answering property. In this case this interface defines a answering with a protected set, allowing a read only property for any object using an instance of Callable, but allows class implementors to write values to it, like TechPhone class does when implements hang() method.

#### Mixins and Multiple Inheritance

As described above, Vala while it is backed by C and GObject, can provide a limited multiple inheritance mechanism, by adding virtual methods to Interfaces. Is possible to add some ways to define default method implementations in interface implementor class and allow derived classes to override that methods.

If you define a virtual method in an interface and implement it in a class, you can't override interface's method without leaving derived classes unable to access to interface default one. Consider following code:

public interface Callable : GLib.Object {
 public abstract bool answering { get; protected set; }
 public abstract void answer ();
 public abstract bool hang ();
 public static bool default\_hang (Callable call)
 {
 stdout.printf ("At Callable.hang()\\n");
 call.answering = false;
 return true;
 }
}
public abstract class Caller : GLib.Object, Callable
{
 public bool answering { get; protected set; }
 public void answer ()
 {
 stdout.printf ("At Caller.answer()\\n");
 answering = true;
 hang ();
 }
 public virtual bool hang () { return Callable.default\_hang (this); }
}
public class TechPhone : Caller {
 public string number { get; set; }
}
public class Phone : Caller {
 public override bool hang () {
 stdout.printf ("At Phone.hang()\\n");
 return false;
 }
 
 public static void main ()
 {
 var f = (Callable) new Phone ();
 f.answer ();
 if (f.hang ())
 stdout.printf("Hand done.\\n");
 else
 stdout.printf("Hand Error!\\n");
 
 var t = (Callable) new TechPhone ();
 t.answer ();
 if (t.hang ())
 stdout.printf("Tech Hand done.\\n");
 else
 stdout.printf("Tech Hand Error!\\n");
 stdout.printf("END\\n");
 }
}

In this case, we have defined a Callable interface with a default implementation for abstract bool hang () called default\_hang, it could be a static or virtual method. Then Caller is a base class implementing Callable for the TechPhone and Phone classes, while Caller's hang () method simple call Callable default implementation. TechPhone doesn't do anything and just takes Caller as base class, using the default method implementations; but Phone overrides Caller.hang () and this makes to use its own implementation, allowing to always call it even if it is cast to Callable object.

##### Explicit method implementation

The explicit interface method implementation allows to implement two interfaces that have methods (not properties) with the same name. Example:

interface Foo {
 public abstract int m();
}
interface Bar {
 public abstract string m();
}
class Cls: Foo, Bar {
 public int Foo.m() {
 return 10;
 }
 public string Bar.m() {
 return "bar";
 }
}
void main () {
 var cls = new Cls ();
 message ("%d %s", ((Foo) cls).m(), ((Bar) cls).m());
}

Will output 10 bar.

*   This future were added since Vala version 0.26.

### Polymorphism

_Polymorphism_ describes the way in which the same object can be used as though it were more than one distinct type of thing. Several of the techniques already described here suggest how this is possible in Vala: An instance of a class may be used as in instance of a superclass, or of any implemented interfaces, without any knowledge of its actual type.

A logical extension of this power is to allow a subtype to behave differently to its parent type when addressed in exactly the same way. This is not a very easy concept to explain, so I'll begin with an example of what will happen if you do not directly aim for this goal:

class SuperClass : GLib.Object {
 public void method\_1() {
 stdout.printf("SuperClass.method\_1()\\n");
 }
}
class SubClass : SuperClass {
 public void method\_1() {
 stdout.printf("SubClass.method\_1()\\n");
 }
}

These two classes both implement a method called "method\_1", and "SubClass" therefore contains two methods called "method\_1", as it inherits one from "SuperClass". Each of these may be called as the following code shows:

SubClass o1 = new SubClass();
o1.method\_1();
SuperClass o2 = o1;
o2.method\_1();

This will actually result in two different methods being called. The second line believes "o1" to be a "SubClass" and will call that class's version of the method. The fourth line believes "o2" to be a "SuperClass" and will call that class's version of the method.

The problem this example exposes, is that any code holding a reference to "SuperClass" will call the methods actually described in that class, even in the actual object is of a subclass. The way to change this behaviour is using virtual methods. Consider the following rewritten version of the last example:

class SuperClass : GLib.Object {
 public virtual void method\_1() {
 stdout.printf("SuperClass.method\_1()\\n");
 }
}
class SubClass : SuperClass {
 public override void method\_1() {
 stdout.printf("SubClass.method\_1()\\n");
 }
}

When this code is used in the same way as before, "SubClass"'s "method\_1" will be called twice. This is because we have told the system that "method\_1" is a virtual method, meaning that if it is overridden in a subclass, that new version will always be executed on instances of that subclass, regardless of the knowledge of the caller.

This distinction is probably familiar to programmers of some languages, such as C++, but it is in fact the opposite of Java style languages, in which steps must be taken to prevent a method being virtual.

You will probably now also have recognised that when method is declared as abstract it must also be virtual. Otherwise, it would not be possible to execute that method given an apparent instance of the type it was declared in. When implementing an abstract method in a subclass, you may therefore choose to declare the implementation as override, thus passing on the virtual nature of the method, and allowing subtypes to do the same if they desire.

It's also possible to implement interface methods in such a way that subclasses can change the implementation. The process in this case is for the initial implementation to declare the method implementation to be virtual, and then subclasses can override as required.

When writing a class, it is common to want to use functionality defined in a class you have inherited from. This is complicated where the method name is used more than one in the inheritance tree for your class. For this Vala provides the base keyword. The most common case is where you have overridden a virtual method to provide extra functionality, but still need the parent class' method to be called. The following example shows this case:

public override void method\_name() {
 base.method\_name();
 extra\_task();
}

Vala also allows properties to be virtual:

class SuperClass : GLib.Object {
 public virtual string prop\_1 {
 get {
 return "SuperClass.prop\_1";
 }
 }
}
class SubClass : SuperClass {
 public override string prop\_1 {
 get {
 return "SubClass.prop\_1";
 }
 }

### Method Hiding

By using the new modifier you can hide an inherited method with a new method of the same name. The new method may have a different signature. Method hiding is not to be confused with method overriding, because method hiding does not exhibit polymorphic behaviour.

class Foo : Object {
 public void my\_method() { }
}
class Bar : Foo {
 public new void my\_method() { }
}

You can still call the original method by casting to the base class or interface:

void main() {
 var bar = new Bar();
 bar.my\_method();
 (bar as Foo).my\_method();
}

### Run-Time Type Information

Since Vala classes are registered at runtime and each instance carries its type information you can dynamically check the type of an object with the is operator:

bool b = object is SomeTypeName;

You can get the type information of Object instances with the get\_type() method:

Type type = object.get\_type();
stdout.printf("%s\\n", type.name());

With the typeof() operator you can get the type information of a type directly. From this type information you can later create new instances with Object.new():

Type type = typeof(Foo);
Foo foo = (Foo) Object.new(type);

Which constructor will be called? It's the construct {} block that will be described in the section about gobject-style construction.

### Dynamic Type Casting

For the dynamic cast, a variable is casted by a postfix expression as DesiredTypeName. Vala will include a runtime type checking to ensure this casting is reasonable - if it is an illegal casting, null will be returned. However, this requires both the source type and the target type to be referenced class types.

For example,

Button b = widget as Button;

If for some reason the class of the widget instance is not the Button class or one of its subclasses or does not implement the Button interface, b will be null. This cast is equivalent to:

Button b = (widget is Button) ? (Button) widget : null;

### Generics

Vala includes a runtime generics system, by which a particular instance of a class can be restricted with a particular type or set of types chosen at construction time. This restriction is generally used to require that data stored in the object must be of a particular type, for example in order to implement a list of objects of a certain type. In that example, Vala would make sure that only objects of the requested type could be added to the list, and that on retrieval all objects would be cast to that type.

In Vala, generics are handled while the program is running. When you define a class that can be restricted by a type, there still exists only one class, with each instance customised individually. This is in contrast to C++ which creates a new class for each type restriction required - Vala's is similar to the system used by Java. This has various consequences, most importantly: that static members are shared by the type as a whole, regardless of the restrictions placed on each instance; and that given a class and a subclass, a generic refined by the subclass can be used as a generic refined by the class.

The following code demonstrates how to use the generics system to define a minimal wrapper class:

public class Wrapper<G\> : GLib.Object {
 private G data;
 public void set\_data(G data) {
 this.data = data;
 }
 public G get\_data() {
 return this.data;
 }
}

This "Wrapper" class must be restricted with a type in order to instantiate it - in this case the type will be identified as "G", and so instances of this class will store one object of "G" type, and have methods to set or get that object. (The reason for this specific example is to provide reason explain that currently a generic class cannot use properties of its restriction type, and so this class has simple get and set methods instead.)

In order to instantiate this class, a type must be chosen, for example the built in string type (in Vala there is no restriction on what type may be used in a generic). To create an briefly use this class:

var wrapper = new Wrapper<string\>();
wrapper.set\_data("test");
var data = wrapper.get\_data();

As you can see, when the data is retrieved from the wrapper, it is assigned to an identifier with no explicit type. This is possible because Vala knows what sort of objects are in each wrapper instance, and therefore can do this work for you.

The fact that Vala does not create multiple classes out of your generic definition means that you can code as follows:

class TestClass : GLib.Object {
}
void accept\_object\_wrapper(Wrapper<Glib.Object\> w) {
}
...
var test\_wrapper = new Wrapper<TestClass\>();
accept\_object\_wrapper(test\_wrapper);
...

Since all "TestClass" instances are also Objects, the "accept\_object\_wrapper" method will happily accept the object it is passed, and treat its wrapped object as though it was a GLib.Object instance.

### GObject-Style Construction

As pointed out before, Vala supports an alternative construction scheme that is slightly different to the one described before, but closer to the way GObject construction works. Which one you prefer depends on whether you come from the GObject side or from the Java or C# side. The gobject-style construction scheme introduces some new syntax elements: _construct properties_, a special Object(...) call and a construct block. Let's take a look at how this works:

public class Person : Object {
 /\* Construction properties \*/
 public string name { get; construct; }
 public int age { get; construct set; }
 public Person(string name) {
 Object(name: name);
 }
 public Person.with\_age(string name, int years) {
 Object(name: name, age: years);
 }
 construct {
 // do anything else
 stdout.printf("Welcome %s\\n", this.name);
 }
}

With the gobject-style construction scheme each construction method only contains an Object(...) call for setting so-called _construct properties_. The Object(...) call takes a variable number of named arguments in the form of property: value. These properties must be declared as construct or set properties. They will be set to the given values and afterwards all construct {} blocks in the hierarchy from _GLib.Object_ down to our class will be called.

The construct block is guaranteed to be called when an instance of this class is created, even if it is created as a subtype. It does neither have any parameters, nor a return value. Within this block you can call other methods and set member variables as needed.

Construct properties are defined just as get and set properties, and therefore can run arbitrary code on assignment. If you need to do initialisation based on a single construct property, it is possible to write a custom construct block for the property, which will be executed immediately on assignment, and before any other construction code.

If a construct property is declared without set it is a so-called _construct only_ property, which means it can only be assigned on construction, but no longer afterwards. In the example above _name_ is such a construct only property.

Here's a summary of the various types of properties together with the nomenclature usually found in the documentation of gobject-based libraries:

 public int a { get; private set; }    // Read
 public int b { private get; set; }    // Write
 public int c { get; set; }            // Read / Write
 public int d { get; set construct; }  // Read / Write / Construct
 public int e { get; construct; }      // Read / Write-Construct-Only

In some cases you may also want to perform some action - not when instances of a class is created - but when the class itself is created by the GObject runtime. In GObject terminology we are talking about a snippet of code run inside the class\_init function for the class in question. In Java this is known as _static initializer blocks_. In Vala this looks like:

 /\* This snippet of code is run when the class
 \* is registered with the type system \*/
 static construct {
 ...
 }

Advanced Features
-----------------

### Assertions and Contract Programming

With _assertions_ a programmer can check assumptions at runtime. The syntax is assert(_condition_). If an assertion fails the program will terminate with an appropriate error message. There are a few more assertion methods within the GLib standard namespace, e.g.:

assert\_not\_reached()

return\_if\_fail(bool expr)

return\_if\_reached()

warn\_if\_fail(bool expr)

warn\_if\_reached()

You might be tempted to use assertions in order to check method arguments for null. However, this is not necessary, since Vala does that implicitly for all parameters that are not marked with ? as being _nullable_.

void method\_name(Foo foo, Bar bar) {
 /\* Not necessary, Vala does that for you:
 return\_if\_fail(foo != null);
 return\_if\_fail(bar != null);
 \*/
}

Vala supports basic [contract programming](http://en.wikipedia.org/wiki/Contract_programming) features. A method may have preconditions (requires) and postconditions (ensures) that must be fulfilled at the beginning or the end of a method respectively:

double method\_name(int x, double d)
 requires (x > 0 && x < 10)
 requires (d >= 0.0 && d <= 1.0)
 ensures (result >= 0.0 && result <= 10.0)
{
 return d \* x;
}

result is a special variable representing the return value.

### Error Handling

GLib has a system for managing runtime exceptions called GError. Vala translates this into a form familiar to modern programming languages, but its implementation means it is not quite the same as in Java or C#. It is important to consider when to use this type of error handling - GError is very specifically designed to deal with recoverable runtime errors, i.e. factors that are not known until the program is run on a live system, and that are not fatal to the execution. You should not use GError for problems that can be foreseen, such as reporting that an invalid value has been passed to a method. If a method, for example, requires a number greater than 0 as a parameter, it should fail on negative values using contract programming techniques such as preconditions or assertions described in the previous section.

Vala errors are so-called _checked exceptions_, which means that errors must get handled at some point. However, if you don't catch an error the Vala compiler will only issue a warning without stopping the compilation process.

Using exceptions (or _errors_ in Vala terminology) is a matter of:

1) Declaring that a method may raise an error:

void my\_method() throws IOError {
 // ...
}

2) Throwing the error when appropriate:

if (something\_went\_wrong) {
 throw new IOError.FILE\_NOT\_FOUND("Requested file could not be found.");
}

3) Catching the error from the calling code:

try {
 my\_method();
} catch (IOError e) {
 stdout.printf("Error: %s\\n", e.message);
}

4) Comparing error code by "is" operator

IOChannel channel;
try {
 channel = new IOChannel.file("/tmp/my\_lock", "w");
} catch (FileError e) {
 if(e is FileError.EXIST) {
 throw e;
 }
 GLib.error("", e.message);
}

All this appears more or less as in other languages, but defining the types of errors allowed is fairly unique. Errors have three components, known as "domain", "code" and message. Messages we have already seen, it is simply a piece of text provided when the error is created. Error domains describe the type of problem, and equates to a subclass of "Exception" in Java or similar. In the above examples we imagined an error domain called "IOError". The third part, the error code is a refinement describing the exact variety of problem encountered. Each error domain has one or more error codes - in the example there is a code called "FILE\_NOT\_FOUND".

The way to define this information about error types is related to the implementation in glib. In order for the examples here to work, a definition is needed such as:

errordomain IOError {
 FILE\_NOT\_FOUND
}

When catching an error, you give the error domain you wish to catch errors in, and if an error in that domain is thrown, the code in the handler is run with the error assigned to the supplied name. From that error object you can extract the error code and message as needed. If you want to catch errors from more than one domain, simply provide extra catch blocks. There is also an optional block that can be placed after a try and any catch blocks, called finally. This code is to be run always at the end of the section, regardless of whether an error was thrown or any catch blocks were executed, even if the error was in fact no handled and will be thrown again. This allows, for example, any resources reserved in the try block be freed regardless of any errors raised. A complete example of these features:

public errordomain ErrorType1 {
 CODE\_1A
}
public errordomain ErrorType2 {
 CODE\_2A,
 CODE\_2B
}
public class Test : GLib.Object {
 public static void thrower() throws ErrorType1, ErrorType2 {
 throw new ErrorType1.CODE\_1A("Error");
 }
 public static void catcher() throws ErrorType2 {
 try {
 thrower();
 } catch (ErrorType1 e) {
 // Deal with ErrorType1
 } finally {
 // Tidy up
 }
 }
 public static int main(string\[\] args) {
 try {
 catcher();
 } catch (ErrorType2 e) {
 // Deal with ErrorType2
 if (e is ErrorType2.CODE\_2B) {
 // Deal with this code
 }
 }
 return 0;
 }
}

This example has two error domains, both of which can be thrown by the "thrower" method. Catcher can only throw the second type of error, and so must handle the first type if "thrower" throws it. Finally the "main" method will handle any errors from "catcher".

### Parameter Directions

A method in Vala is passed zero or more arguments. The default behaviour when a method is called is as follows:

*   Any value type parameters are copied to a location local to the method as it executes.
*   Any reference type parameters are not copied, instead just a reference to them is passed to the method.

This behaviour can be changed with the modifiers 'ref' and 'out'.

'out' from the caller side

you may pass an uninitialised variable to the method and you may expect it to be initialised after the method returns

'out' from callee side

the parameter is considered uninitialised and you have to initialise it

'ref' from caller side

the variable you're passing to the method has to be initialised and it may be changed or not by the method

'ref' from callee side

the parameter is considered initialised and you may change it or not

void method\_1(int a, out int b, ref int c) { ... }
void method\_2(Object o, out Object p, ref Object q) { ... }

These methods can be called as follows:

int a = 1;
int b;
int c = 3;
method\_1(a, out b, ref c);
Object o = new Object();
Object p;
Object q = new Object();
method\_2(o, out p, ref q);

The treatment of each variable will be:

*   "a" is of a value type. The value will be copied into a new memory location local to the method, and so changes to it will not be visible to the caller.
*   "b" is also of a value type, but passed as an out parameter. In this case, the value is not copied, instead a pointer to the data is passed to the method, and so any change to the method parameter will be visible to the calling code.
    
*   "c" is treated in the same way as "b", the only change is in the signalled intent of the method.
*   "o" is of a reference type. The method is passed a reference to the same object as the caller has. The method can therefore change that object, but if it reassigns to the parameter, that change will not be visible to the caller.
*   "p" is of the same type, but passed as an out parameter. This means that the method will receive a pointer to the reference to the object. It may therefore replace the reference with a reference to another object, and when the method returns the caller will instead own a reference to that other object. When you use this type of parameter, if you do not assign a new reference to the parameter, it will be set to null.
    
*   "q" is again of the same type. This case is treated like "p" with the important differences that the method may choose not to change the reference, and may access the object referred to. Vala will ensure that in this instance "q" actually refers to any object, and is not set to null.
    

Here is an example of how to implement method\_1():

void method\_1(int a, out int b, ref int c) {
 b = a + c;
 c = 3;
}

When setting the value to the out argument "b", Vala will ensure that "b" is not null. So you can safely pass null as the second argument of method\_1() if you are not interested by this value.

### Collections

[Gee](https://wiki.gnome.org/Projects/Libgee) is a library of collection classes, written in Vala. The classes should all be familiar to users of libraries such as Java's Foundation Classes. Gee consists of a set of interfaces and various types that implement these in different ways.

If you want to use Gee in your own application, install the library separately on your system. Gee can be obtained from [http://live.gnome.org/Projects/Libgee](http://live.gnome.org/Projects/Libgee). In order to use the library you must compile your programs with \--pkg gee-0.8.

The fundamental types of collection are:

*   Lists: Ordered collections of items, accessible by numeric index.
*   Sets: Unordered collections of distinct.
*   Maps: Unordered collection of items, accessible by index of arbitrary type.

All the lists and sets in the library implement the _Collection_ interface, and all maps the _Map_ interface. Lists also implement _List_ and sets _Set_. These common interfaces means not only that all collections of a similar type can be used interchangeably, but also that new collections can be written using the same interfaces, and therefore used with existing code.

Also common to every _Collection_ type is the _Iterable_ interface. This means that any object in this category can be iterated through using a standard set of methods, or directly in Vala using the foreach syntax.

All classes and interfaces use the generics system. This means that they must be instantiated with a particular type or set of types that they will contain. The system will ensure that only the intended types can be put into the collections, and that when objects are retrieved they are returned as the correct type.

[Full Gee API documentation](http://valadoc.org/gee-0.8/index.htm), [Gee Examples](https://wiki.gnome.org/Projects/Vala/GeeSamples)

Some important Gee classes are:

#### ArrayList<G>

Implementing: Iterable<G>, Collection<G>, List<G>

An ordered list of items of type G backed by a dynamically resizing array. This type is very fast for accessing data, but potentially slow at inserting items anywhere other than at the end, or at inserting items when the internal array is full.

#### HashMap<K,V>

Implementing: Iterable<Entry<K,V>>, Map<K,V>

A 1:1 map from elements of type K to elements of type V. The mapping is made by computing a hash value for each key - this can be customised by providing pointers to functions for hashing and testing equality of keys in specific ways.

You can optionally pass custom hash and equal functions to the constructor, for example:

var map = new Gee.HashMap<Foo, Object\>(foo\_hash, foo\_equal);

For strings and integers the hash and equal functions are detected automatically, objects are distinguished by their references by default. You have to provide custom hash and equal functions only if you want to override the default behaviour.

#### HashSet<G>

Implementing: Iterable<G>, Collection<G>, Set<G>

A set of elements of type G. Duplicates are detected by computing a hash value for each key - this can be customised by providing pointers to functions for hashing and testing equality of keys in specific ways.

#### Read-Only Views

You can get a read-only view of a collection via the _read\_only\_view_ property, e.g. my\_map.read\_only\_view. This will return a wrapper that has the same interface as its contained collection, but will not allow any form of modification, or any access to the contained collection.

### Methods With Syntax Support

Vala recognizes some methods with certain names and signatures and provides syntax support for them. For example, if a type has a _contains()_ method objects of this type can be used with the in operator. The following table lists these special methods. _T_ and _Tn_ are only type placeholders in this table and meant to be replaced with real types.

**Indexers**

T2 get(T1 index)

index access: obj\[index\]

void set(T1 index, T2 item)

index assignment: obj\[index\] = item

**Indexers with multiple indices**

T3 get(T1 index1, T2 index2)

index access: obj\[index1, index2\]

void set(T1 index1, T2 index2, T3 item)

index assignment: obj\[index1, index2\] = item

(... and so on for more indices)

**Others**

T slice(long start, long end)

slicing: obj\[start:end\]

bool contains(T needle)

in operator: bool b = needle in obj

string to\_string()

support within string templates: @"$obj"

Iterator iterator()

iterable via foreach

T2 get(T1 index)  
T1 size { get; }

iterable via foreach

The _Iterator_ type can have any name and must implement one of these two protocols:

bool next()  
T get()

standard iterator protocol: iterating until _.next()_ returns false. The current element is retrieved via _.get()_.

T? next\_value()

alternative iterator protocol: If the iterator object has a _.next\_value()_ function that returns a nullable type then we iterate by calling this function until it returns null.

This example implements some of these methods:

public class EvenNumbers {
 public int get(int index) {
 return index \* 2;
 }
 public bool contains(int i) {
 return i % 2 == 0;
 }
 public string to\_string() {
 return "\[This object enumerates even numbers\]";
 }
 public Iterator iterator() {
 return new Iterator(this);
 }
 public class Iterator {
 private int index;
 private EvenNumbers even;
 public Iterator(EvenNumbers even) {
 this.even = even;
 }
 public bool next() {
 return true;
 }
 public int get() {
 this.index++;
 return this.even\[this.index - 1\];
 }
 }
}
void main() {
 var even = new EvenNumbers();
 stdout.printf("%d\\n", even\[5\]);   // get()
 if (4 in even) {                  // contains()
 stdout.printf(@"$even\\n");    // to\_string()
 }
 foreach (int i in even) {         // iterator()
 stdout.printf("%d\\n", i);
 if (i == 20) break;
 }
}

### Multi-Threading

#### Threads in Vala

A program written in Vala may have more than one thread of execution, allowing it it do more than one thing at a time. Exactly how this is managed is outside of Vala's scope - threads may be sharing a single processor core or not, depending on the environment.

A thread in Vala is not defined at compile time, instead it is simply a portion of Vala code that is requested at runtime to be executed as a new thread. This is done using the static methods of the _Thread_ class in GLib, as shown in the following (very simplified) example:

void\* thread\_func() {
 stdout.printf("Thread running.\\n");
 return null;
}
int main(string\[\] args) {
 if (!Thread.supported()) {
 stderr.printf("Cannot run without threads.\\n");
 return 1;
 }
 try {
 Thread.create(thread\_func, false);
 } catch (ThreadError e) {
 return 1;
 }
 return 0;
}

This short program will request a new thread be created and executed. The code to be run being that in _thread\_func_. Also note the test at the start of the main method - a Vala program will not be able to use threads unless compiled appropriately, so if you build this example in the usual way, it will just display an error and stop running. Being able to check for thread support at runtime allows a program to be built to run either with or without threads if that is wanted. In order to build with thread support, run:

$ valac --thread threading-sample.vala

This will both include required libraries and make sure the threading system is initialised whenever possible.

The program will now run without segmentation faults, but it will still not act as expected. Without any sort of event loop, a Vala program will terminate when its primary thread (the one created to run "main") ends. In order to control this behaviour, you can allow threads to cooperate. This can be done powerfully using event loops and asynchronous queues, but in this introduction to threading we will just show the basic capabilities of threads.

It is possible for a thread to tell the system that it currently has no need to execute, and thereby suggest that another thread should be run instead, this is done using the static method _Thread.yield()_. If this statement was placed at the end of the above _main_ method, the runtime system will pause the main thread for an instant and check if there are other threads that can be run - on finding the newly created thread in a runnable state, it will run that instead until it is finished - and the program will act is it appears it should. However, there is no guarantee that this will happen still. The system is able to decide when threads run, and as such might not allow the new thread to finish before the primary thread is restarted and the program ends.

In order to wait for a thread to finish entirely there is the _join()_ method. Calling this method on a _Thread_ object causes the calling thread to wait for the other thread to finish before proceeding. It also allows a thread to receive the return value of another, if that is useful. To implement joining threads:

try {
 unowned Thread thread = Thread.create(thread\_func, true);
 thread.join();
} catch (ThreadError e) {
 return 1;
}

This time, when we create the thread we give true as the last argument. This marks the thread as "joinable". We also remember the value returned from the creation - an unowned reference to a Thread object (unowned references are explained later and are not vital to this section.) With this reference it is possible to join the new thread to the primary thread. With this version of the program it is guaranteed that the newly created thread will be allowed to fully execute before the primary thread continues and the program terminates.

All these examples have a potential problem, in that the newly created thread doesn't know the context in which it should run. In C you would supply the thread creation method with some data, in Vala instead you would normally pass an instance method to Thread.create, instead of a static method.

#### Resource Control

Whenever more than one thread of execution is running simultaneously, there is a chance that data are accessed simultaneously. This can lead to race conditions, where the outcome depends on when the system decides to switch between threads.

In order to control this situation, you can use the lock keyword to ensure that certain blocks of code will not be interrupted by other threads that need to access the same data. The best way to show this is probably with an example:

public class Test : GLib.Object {
 private int a { get; set; }
 public void action\_1() {
 lock (a) {
 int tmp = a;
 tmp++;
 a = tmp;
 }
 }
 public void action\_2() {
 lock (a) {
 int tmp = a;
 tmp\--;
 a = tmp;
 }
 }
}

This class defines two methods, where both need to change the value of "a". If there were no lock statements here, it would be possible for the instructions in these methods to be interweaved, and the resulting change to "a" would be effectively random. As there are the lock statements here, Vala will guarantee that if one thread has locked "a", another thread that needs the same lock will have to wait its turn.

In Vala it is only possible to lock members of the object that is executing the code. This might appear to be a major restriction, but in fact the standard use for this technique should involve classes that are individually responsible for controlling a resource, and so all locking will indeed be internal to the class. Likewise, in above example all accesses to "a" are encapsulated in the class.

### The Main Loop

GLib includes a system for running an event loop, in the classes around MainLoop. The purpose of this system is to allow you to write a program that waits for events and responds to them, instead of having to constantly check conditions. This is the model that GTK+ uses, so that a program can wait for user interaction without having to have any currently running code.

The following program creates and starts a MainLoop, and then attaches a source of events to it. In this case the source is a simple timer, that will execute the given method after 2000ms. The method will in fact just stop the main loop, which will in this case exit the program.

void main() {
 var loop = new MainLoop();
 var time = new TimeoutSource(2000);
 time.set\_callback(() => {
 stdout.printf("Time!\\n");
 loop.quit();
 return false;
 });
 time.attach(loop.get\_context());
 loop.run();
}

When using GTK+, a main loop will be created automatically, and will be started when you call the \`Gtk.main()' method. This marks the point where the program is ready to run and start accepting events from the user or elsewhere. The code in GTK+ is equivalent to the short example above, and so you may add event sources in much the same way, although of course you need to use the GTK+ methods to control the main loop.

void main(string\[\] args) {
 Gtk.init(ref args);
 var time = new TimeoutSource(2000);
 time.set\_callback(() => {
 stdout.printf("Time!\\n");
 Gtk.main\_quit();
 return false;
 });
 time.attach(null);
 Gtk.main();
}

A common requirement in GUI programs is to execute some code as soon as possible, but only when it will not disturb the user. For this, you use IdleSource instances. These send events to the programs main loop, but request they only be dealt with when there is nothing more important to do.

For more information about event loops, see the GLib and GTK+ documentation.

### Asynchronous Methods

Asynchronous methods are methods whose execution can be paused and resumed under the control of the programmer. They are often used in the main thread of an application where a method needs to wait for an external slow task to complete, but must not stop other processing from happening. (For example, one slow operation must not freeze the whole GUI). When the method has to wait, it gives control of the CPU back to its caller (i.e. it _yields_), but it arranges to be called back to resume execution when data becomes ready. External slow tasks that async methods might wait for include: waiting for data from a remote server, or waiting for calculations in another thread to complete, or waiting for data to load from a disk drive.

Asynchronous methods are normally used with a GLib main loop running, because idle callbacks are used to handle some of the internal callbacks. However under certain conditions async may be used without the GLib main loop, for example if the async methods always yield and Idle.add() is never used. (FIXME: Check what are the exact conditions.)

Asynchronous methods are designed for interleaving the processing of many different long-lived operations within a single thread. They do not by themselves spread the load out over different threads. However, an async method may be used to control a background thread and to wait for it to complete, or to queue operations for a background thread to process.

Async methods in Vala use the GIO library to handle the callbacks, so must be built with the \--pkg=gio-2.0 option.

An asynchronous method is defined with the async keyword. For example:

 async void display\_jpeg(string fnam) {
 // Load JPEG in a background thread and display it when loaded
 \[...\]
 }

or:

 async int fetch\_webpage(string url, out string text) throws IOError {
 // Fetch a webpage asynchronously and when ready return the 
 // HTTP status code and put the page contents in 'text'
 \[...\]
 text = result;
 return status;
 }

The method may take arguments and return a value like any other method. It may use a yield statement at any time to give control of the CPU back to its caller.

An async method may be called with either of these two forms:

 display\_jpeg.begin("test.jpg");
 display\_jpeg.begin("test.jpg", (obj, res) => {
 display\_jpeg.end(res);
 });

Both forms starts the async method running with the given arguments. The second form in addition registers an AsyncReadyCallback which is executed when the method finishes. The callback takes a source object, obj, and an instance of GAyncResult, res, as arguments. In the callback the .end() method should be called to receive the return value of the asynchronous method if it has one. If the async method can throw an exception, the .end() call is where the exception arrives and must be caught. If the method has out arguments, then these should be omitted from the .begin() call and added to the .end() call instead.

For example:

 fetch\_webpage.begin("http://www.example.com/", (obj, res) => {
 try {
 string text;
 var status = fetch\_webpage.end(res, out text);
 // Result of call is in 'text' and 'status' ...
 } catch (IOError e) {
 // Problem ...
 }
 });

When an asynchronous method starts running, it takes control of the CPU until it reaches its first yield statement, at which point it returns to the caller. When the method is resumed, it continues execution immediately after that yield statement. There are several common ways to use yield:

This form gives up control, but arranges for the GLib main loop to resume the method when there are no more events to process:

 Idle.add(fetch\_webpage.callback);
 yield;

This form gives up control, and stores the callback details for some other code to use to resume the method's execution:

 SourceFunc callback = fetch\_webpage.callback;
 \[... store 'callback' somewhere ...\]
 yield;

Some code elsewhere must now call the stored SourceFunc in order for the method to be resumed. This could be done by scheduling the GLib main loop to run it:

 Idle.add((owned) callback);

or alternatively a direct call may be made if the caller is running in the main thread:

 callback();

If the direct call above is used, then the resumed asynchronous method takes control of the CPU immediately and runs until its next yield before returning to the code that executed callback(). The Idle.add() method is useful if the callback must be made from a background thread, e.g. to resume the async method after completion of some background processing. (The (owned) cast is necessary to avoid a warning about copying delegates.)

The third common way of using yield is when calling another asynchronous method, for example:

 yield display\_jpeg(fnam);

or

 var status = yield fetch\_webpage(url, out text);

In both cases, the calling method gives up control of the CPU and does not resume until the called method completes. The yield statement automatically registers a callback with the called method to make sure that the caller resumes correctly. The automatic callback also collects the return value from the called method.

When this yield statement executes, control of the CPU first passes to the called method which runs until its first yield and then drops back to the calling method, which completes the yield statement itself, and then gives back control to its own caller.

#### Examples

See [Async Method Samples](https://wiki.gnome.org/Projects/Vala/AsyncSamples) for examples of different ways that async may be used.

### Weak References

Vala's memory management is based on automatic reference counting. Each time an object is assigned to a variable its internal reference count is increased by 1, each time a variable referencing an object goes out of scope its internal reference count is decreased by 1. If the reference count reaches 0 the object will be freed.

However, it is possible to form a reference cycle with your data structures. For example, with a tree data structure where a child node holds a reference to its parent and vice versa, or a doubly-linked list where each element holds a reference to its predecessor and the predecessor holds a reference to its successor.

In these cases objects could keep themselves alive simply by referencing to each other, even though they should be freed. To break such a reference cycle you can use the weak modifier for one of the references:

class Node {
 public weak Node prev;
 public Node next;
}

This topic is explained in detail on this page: [Vala's Memory Management Explained](https://wiki.gnome.org/Projects/Vala/ReferenceHandling).

### Ownership

#### Unowned References

Normally when creating an object in Vala you are returned a reference to it. Specifically this means that as well as being passed a pointer to the object in memory, it is also recorded in the object itself that this pointer exists. Similarly, whenever another reference to the object is created, this is also recorded. As an object knows how many references there are to it, it can automatically be removed when needed. This is the basis of [Vala's memory management](https://wiki.gnome.org/Projects/Vala/ReferenceHandling).

#### Methods ownership

_Unowned references_ conversely are not recorded in the object they reference. This allows the object to be removed when it logically should be, regardless of the fact that there might be still references to it. The usual way to achieve this is with a method defined to return an unowned reference, e.g.:

class Test {
 private Object o;
 public unowned Object get\_unowned\_ref() {
 this.o = new Object();
 return this.o;
 }
}

When calling this method, in order to collect a reference to the returned object, you must expect to receive a weak reference:

unowned Object o = get\_unowned\_ref();

The reason for this seemingly over complicated example because of the concept of ownership.

*   If the Object "o" was not stored in the class, then when the method "get\_unowned\_ref" returned, "o" would become unowned (i.e. there would be no references to it). If this were the case, the object would be deleted and the method would never return a valid reference.
*   If the return value was not defined as unowned, the ownership would pass to the calling code. The calling code is, however, expecting an unowned reference, which cannot receive the ownership.

If the calling code is written as

Object o = get\_unowned\_ref();

Vala will try to either obtain a reference of or a duplicate of the instance the unowned reference pointing to.

#### Properties ownership

In contrast to normal methods, properties always have unowned return value. That means you can't return a new object created within the get method. That also means, you can't use an owned return value from a method call. The somewhat irritating fact is because of that a property value is owned by the object that HAS this property. A call to obtain this property value should not steal or reproduce (by duplicating, or increasing the reference count of) the value from the object side.

As such, the following example will result in a compilation error

public Object property {
 get {
 return new Object();   // WRONG: property returns an unowned reference,
 // the newly created object will be deleted when
 // the getter scope ends the caller of the
 // getter ends up receiving an invalid reference
 // to a deleted object.
 }
}

nor can you do this

public string property {
 get {
 return getter\_method();   // WRONG: for the same reason above.
 }
}
public string getter\_method() {
 return "some text"; // "some text" is duplicated and returned at this point.
}

on the other hand, this is perfectly fine

public string property {
 get {
 return getter\_method();   // GOOD: getter\_method returns an unowned value
 }
}
public unowned string getter\_method() {
 return "some text";
 // Don't be alarmed that the text is not assigned to any strong variable.
 // Literal strings in Vala are always owned by the program module itself,
 // and exist as long as the module is in memory
}

The unowned modifier can be used to make automatic property's storage unowned. That means

public unowned Object property { get; private set; }

is identical to

private unowned Object \_property;
public Object property {
 get { return \_property; }
}

The keyword owned can be used to specifically ask a property to return a owned reference of the value, therefore causing the property value be reproduced in the object side. Think twice before adding the owned keyword. Is it a property or simply a get\_xxx method? There may also be problems in your design. Anyways, the following code is a correct segment,

public owned Object property { owned get { return new Object(); } }

Unowned references play a similar role to pointers which are described later. They are however much simpler to use than pointers, as they can be easily converted to normal references. However, in general they should not be widely used in the programs unless you know what you are doing.

#### Ownership Transfer

The keyword owned is used to transfer ownership.

*   As a prefix of a parameter type, it means that ownership of the object is transferred into this code context.
*   As an type conversion operator, it can be used to avoid duplicating non-reference counting classes, which is usually impossible in Vala. For example,

Foo foo = (owned) bar;

This means that _bar_ will be set to _null_ and _foo_ inherits the reference/ownership of the object _bar_ references.

### Variable-Length Argument Lists

Vala supports C-style variable-length argument lists ("varargs") for methods. They are declared with an ellipsis ("...") in the method signature. A method with varargs requires at least one fixed argument:

void method\_with\_varargs(int x, ...) {
 var l = va\_list();
 string s = l.arg();
 int i = l.arg();
 stdout.printf("%s: %d\\n", s, i);
}

In this example x is a fixed argument to meet the requirements. You obtain the varargs list with va\_list(). Then you can retrieve the arguments one after another by calling the generic method arg<T>() sequently on this list, with T being the type that the argument should be interpreted as. If the type is evident from the context (as in our example) the type is inferred automatically and you can just call arg() without the generic type argument.

This example parses an arbitrary number of _string - double_ argument pairs:

void method\_with\_varargs(int fixed, ...) {
 var l = va\_list();
 while (true) {
 string? key = l.arg();
 if (key == null) {
 break;  // end of the list
 }
 double val = l.arg();
 stdout.printf("%s: %g\\n", key, val);
 }
}
void main() {
 method\_with\_varargs(42, "foo", 0.75, "bar", 0.25, "baz", 0.32);
}

It checks for _null_ as a sentinel to recognize the end of the varargs list. Vala always implicitly passes _null_ as the last argument of a varargs method call.

Varargs have a serious drawback that you should be aware of: they are not type-safe. The compiler can't tell you whether you are passing arguments of the right type to the method or not. That's why you should consider using varargs only if you have a good reason, for example: providing a convenience function for C programmers using your Vala library, binding a C function. Often an array argument is a better choice.

A common pattern with varargs is to expect alternating _string - value_ pairs as arguments, usually meaning _gobject property - value_. In this case you can write _property: value_ instead, e.g.:

actor.animate (AnimationMode.EASE\_OUT\_BOUNCE, 3000, x: 100.0, y: 200.0, rotation\_angle\_z: 500.0, opacity: 0);

is equivalent to:

actor.animate (AnimationMode.EASE\_OUT\_BOUNCE, 3000, "x", 100.0, "y", 200.0, "rotation-angle-z", 500.0, "opacity", 0);

### Pointers

Pointers are Vala's way of allowing manual memory management. Normally when you create an instance of a type you receive a reference to it, and Vala will take care of destroying the instance when there are no more references left to it. By requesting instead a pointer to an instance, you take responsibility for destroying the instance when it is no longer wanted, and therefore get greater control over how much memory is used.

This functionality is not necessarily needed most of the time, as modern computers are usually fast enough to handle reference counting and have enough memory that small inefficiencies are not important. The times when you might resort to manual memory management are:

*   When you specifically want to optimise part of a program and [unowned references](https://wiki.gnome.org/Projects/Vala/Tutorial#Unowned_References) are insufficient.
    
*   When you are dealing with an external library that does not implement reference counting for memory management (probably meaning one not based on gobject.)

In order to create an instance of a type, and receive a pointer to it:

Object\* o = new Object();

In order to access members of that instance:

o\->method\_1();
o\->data\_1;

In order to free the memory pointed to:

delete o;

Vala also supports the _address-of_ (&) and _indirection_ (\*) operators known from C:

int i = 42;
int\* i\_ptr = &i;    // address-of
int j = \*i\_ptr;     // indirection

The behavior is a bit different with reference types, you can omit the address-of and indirection operator on assignment:

Foo f = new Foo();
Foo\* f\_ptr = f;    // address-of
Foo g = f\_ptr;     // indirection
unowned Foo f\_weak = f;  // equivalent to the second line

The usage of reference-type pointers is equivalent to the use of unowned references.

### Non-Object classes

Classes defined as not being descended from _GLib.Object_ are treated as a special case. They are derived directly from GLib's type system and therefore much lighter in weight. In a more recent Vala compiler, one can also implement interfaces, signals and properties with these classes.

One obvious case of using these non-_Object_ classes stays in the GLib bindings. Because GLib is at a lower level than GObject, most classes defined in the binding are of this kind. Also, as mentioned before, the lighter weight of non-object classes make them useful in many practical situations (e.g. the Vala compiler itself). However the detailed usage of non-_Object_ classes are outside the scope of this tutorial. Be aware that these classes are fundamentally different from structs.

### D-Bus Integration

[D-Bus](http://freedesktop.org/wiki/Software/dbus) is tightly integrated into the language and has never been easier than with Vala.

To export a custom class as a D-Bus service you just need to annotate it with the _DBus_ code attribute and register an instance of this class with your local D-Bus session.

\[DBus(name = "org.example.DemoService")\]
public class DemoService : Object {
 /\* Private field, not exported via D-Bus \*/
 int counter;
 /\* Public field, not exported via D-Bus \*/
 public int status;
 /\* Public property, exported via D-Bus \*/
 public int something { get; set; }
 /\* Public signal, exported via D-Bus
 \* Can be emitted on the server side and can be connected to on the client side.
 \*/
 public signal void sig1();
 /\* Public method, exported via D-Bus \*/
 public void some\_method() {
 counter++;
 stdout.printf("heureka! counter = %d\\n", counter);
 sig1();  // emit signal
 }
 /\* Public method, exported via D-Bus and showing the sender who is
 is calling the method (not exported in the D-Bus interface) \*/
 public void some\_method\_sender(string message, GLib.BusName sender) {
 counter++;
 stdout.printf("heureka! counter = %d, '%s' message from sender %s\\n",
 counter, message, sender);
 }
}

Register an instance of the service and start a main loop:

void on\_bus\_aquired (DBusConnection conn) {
 try {
 // start service and register it as dbus object
 var service = new DemoService();
 conn.register\_object ("/org/example/demo", service);
 } catch (IOError e) {
 stderr.printf ("Could not register service: %s\\n", e.message);
 }
}
void main () {
 // try to register service name in session bus
 Bus.own\_name (BusType.SESSION, "org.example.DemoService", /\* name to register \*/
 BusNameOwnerFlags.NONE, /\* flags \*/
 on\_bus\_aquired, /\* callback function on registration succeeded \*/
 () => {}, /\* callback on name register succeeded \*/
 () => stderr.printf ("Could not acquire name\\n"));
 /\* callback on name lost \*/
 // start main loop
 new MainLoop ().run ();
}

You must compile this example with the _gio-2.0_ package:

$ valac --pkg gio-2.0 dbus-demo-service.vala
$ ./dbus-demo-service

All member names are automatically mangled from Vala's _lower\_case\_with\_underscores_ naming convention to D-Bus _CamelCase_ names. The exported D-Bus interface of this example will have a property _Something_, a signal _Sig1_ and a method _SomeMethod_. You can open a new terminal window and call the method from command line with:

$ dbus-send --type=method\_call                   \\
            --dest=org.example.DemoService       \\
            /org/example/demo                    \\
            org.example.DemoService.SomeMethod

or

$ dbus-send --type=method\_call                   \\
            --dest=org.example.DemoService       \\
            /org/example/demo                    \\
            org.example.DemoService.SomeMethodSender \\
            string:'hello world'

You can also use a graphical D-Bus debugger like [D-Feet](https://wiki.gnome.org/Apps/DFeet) to browse your D-Bus interfaces and call methods.

Some comprehensive examples: [DBus Client Samples](https://wiki.gnome.org/Projects/Vala/DBusClientSamples) and [DBus Server Sample](https://wiki.gnome.org/Projects/Vala/DBusServerSample)

### Profiles

Vala supports a couple of different profiles:

*   gobject (default)
*   posix
*   dova

A profile determines what language features are available and on which libraries the resulting C-Code will depend.

To select a different profile use valac's _\--profile_ switch, e.g.:

valac --profile=posix somecode.vala

Experimental Features
---------------------

Some features of Vala are experimental. This means they are not fully tested and might be subject to changes in future versions.

### Chained Relational Expressions

This feature allows you to write complex relational expressions like

if (1 < a && a < 5) {}
if (0 < a && a < b && b < c && c < d && d < 255) {
 // do something
}

in a more natural way:

if (1 < a < 5) {}
if (0 < a < b < c < d < 255) {
 // do something
}

### Regular Expression Literals

[Regular expressions](http://www.regular-expressions.info/) are a powerful technique for pattern matching in strings. Vala has experimental support for regular expression literals (/regex/). Example:

string email = "tux@kernel.org";
if (/^\[A\-Z0\-9.\_%+-\]+@\[A\-Z0\-9.\-\]+\\.\[A\-Z\]{2,4}$/i.match(email)) {
 stdout.printf("Valid email address\\n");
}

The trailing _i_ makes the expression case insensitive. You can store a regular expression in a variable of type _Regex_:

Regex regex = /foo/;

A example of regular expression replacement:

var r = /(foo|bar|cow)/;
var o = r.replace ("this foo is great", -1, 0, "thing");
print ("%s\\n", o);

The following trailing characters can be used:

*   _i_, letters in the pattern match both upper- and lowercase letters
    
*   _m_, the "start of line" and "end of line" constructs match immediately following or immediately before any newline in the string, respectively, as well as at the very start and end.
    
*   _s_, a dot metacharater _._ in the pattern matches all characters, including newlines. Without it, newlines are excluded.
    
*   _x_, whitespace data characters in the pattern are totally ignored except when escaped or inside a character class.
    

### Strict Non-Null Mode

If you compile your code with \--enable-experimental-non-null the Vala compiler will run in strict non-null type checking mode and consider _every_ type to be not nullable by default unless it is explicitly declared nullable by marking it with a question mark:

Object o1 = new Object();     // not nullable
Object? o2 = new Object();    // nullable

The compiler will perform a static compile-time analysis to ensure that no nullable reference is assigned to a non-nullable reference, e.g. this won't be possible:

o1 = o2;

_o2_ could be _null_ and _o1_ was declared non-nullable, so this assignment is forbidden. However, you can override this behaviour with an explicit non-null cast if you're sure that _o2_ is not _null_:

o1 = (!) o2;

The strict non-null mode helps in avoiding unwanted _null_ dereferencing errors. This feature would come to full potential if the nullability of all return types in bindings was marked correctly, which is currently not always the case.

Libraries
---------

At the system level, a Vala library is exactly a C library, and so the same tools are used. In order to make the process simpler, and so that the Vala compiler can understand the process there is then an extra level of Vala specific information.

A "Vala library" is therefore, the system part:

*   A system library (e.g. _libgee.so_)
    
*   A _pkg-config_ entry (e.g. _gee-1.0.pc_)
    

Both of which are installed in the standard locations. And the Vala specific files:

*   A VAPI file (e.g. _gee-1.0.vapi_)
    
*   An optional dependency file (e.g. _gee-1.0.deps_)
    

These files are explained later in this section. It should be noted that the library names are the same in the Vala specific files as in the _pkg-config_ files.

### Using Libraries

Using a library in Vala is largely automated if you use the _valac_ compiler. The Vala specific library files make up what is known as a package. You tell the compiler that a package is needed by your program as follows:

$ valac --pkg gee-1.0 test.vala

This command means your program can use any of the definitions in the _gee-1.0.vapi_ file, and also any in any of the packages that _gee-1.0_ depends on. These dependencies would be be listed in _gee-1.0.deps_ if there were any. In this example _valac_ is set to build all the way to binary, and will therefore incorporate information from _pkg-config_ to link the correct libraries. This is why the _pkg-config_ names are also used for Vala package names.

Packages are generally used with namespaces, but they are not technically related. This means that even though your application is built with reference to the package, you must still include the required using statements in each file as appropriate, or else use the fully qualified names of all symbols.

It is also possible to treat a local library (one that is not installed) as a package. For comparison, Vala itself uses an internal version of Gee. When _valac_ is built it creates a VAPI file of this internal library and uses it roughly as follows:

$ valac --vapidir ../gee --pkg gee ...

For details on how to generate this library, see the next section or the example.

### Creating a Library

#### Using Autotools

It is possible to use Autotools to create a library written in Vala. A library is created by using C code generated by Vala compiler, linked and installed as any other library. Then you need tell which C files must be used to create the library and which of them must be distributable, allowing others to compile a tarball without Vala using standard Autotools commands: **configure**, **make** and **make install**.

##### Example

This example was taken from GXml recent additions. GXmlDom is a library aimed to have a GObject based libxml2 replacement; is written in Vala and originally used to use WAF to build.

**valac** can be used to generate C code and headers from Vala sources. At this time is possible to generate a GObjectIntrospection and the VAPI file from the vala sources too.

**gxml.vala.stamp** is used as the code sources for our library.

Is important to add --pkg switches in order to valac to success and set all CFLAGS and LIBS required by the C library to compile and link against.

function isnumbered(obj) { return obj.childNodes.length && obj.firstChild.childNodes.length && obj.firstChild.firstChild.className == 'LineNumber'; } function nformat(num,chrs,add) { var nlen = Math.max(0,chrs-(''+num).length), res = ''; while (nlen>0) { res += ' '; nlen-- } return res+num+add; } function addnumber(did, nstart, nstep) { var c = document.getElementById(did), l = c.firstChild, n = 1; if (!isnumbered(c)) { if (typeof nstart == 'undefined') nstart = 1; if (typeof nstep == 'undefined') nstep = 1; var n = nstart; while (l != null) { if (l.tagName == 'SPAN') { var s = document.createElement('SPAN'); var a = document.createElement('A'); s.className = 'LineNumber'; a.appendChild(document.createTextNode(nformat(n,4,''))); a.href = '#' + did + '\_' + n; s.appendChild(a); s.appendChild(document.createTextNode(' ')); n += nstep; if (l.childNodes.length) { l.insertBefore(s, l.firstChild); } else { l.appendChild(s); } } l = l.nextSibling; } } return false; } function remnumber(did) { var c = document.getElementById(did), l = c.firstChild; if (isnumbered(c)) { while (l != null) { if (l.tagName == 'SPAN' && l.firstChild.className == 'LineNumber') l.removeChild(l.firstChild); l = l.nextSibling; } } return false; } function togglenumber(did, nstart, nstep) { var c = document.getElementById(did); if (isnumbered(c)) { remnumber(did); } else { addnumber(did,nstart,nstep); } return false; } document.write('<a href="#" onclick="return togglenumber(\\'CA-77fcf7178098290c034201be974b9c6e26f1b6d5\\', 1, 1);" \\ class="codenumbers">Toggle line numbers<\\/a>'); [Toggle line numbers](https://wiki.gnome.org/Projects/Vala/Tutorial#)

 [1](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_1) NULL =
 [2](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_2) 
 [3](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_3) 
 [4](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_4) AM\_CPPFLAGS = \\
 [5](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_5)         -DPACKAGE\_LOCALE\_DIR\=\\""$(prefix)/$(DATADIRNAME)/locale"\\" \\
 [6](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_6)  -DPACKAGE\_SRC\_DIR=\\""$(srcdir)"\\" \\
 [7](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_7)  -DPACKAGE\_DATA\_DIR=\\""$(datadir)"\\" 
 [8](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_8) 
 [9](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_9) BUILT\_SOURCES = gxml.vala.stamp
 [10](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_10) CLEANFILES = gxml.vala.stamp
 [11](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_11) 
 [12](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_12) AM\_CFLAGS =\\
 [13](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_13)          -Wall\\
 [14](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_14)          -g \\
 [15](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_15)         $(GLIB\_CFLAGS) \\
 [16](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_16)         $(LIBXML\_CFLAGS) \\
 [17](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_17)         $(GIO\_CFLAGS) \\
 [18](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_18)         $(GEE\_CFLAGS) \\
 [19](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_19)         $(VALA\_CFLAGS) \\
 [20](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_20)         $(NULL)
 [21](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_21) 
 [22](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_22) lib\_LTLIBRARIES = libgxml.la
 [23](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_23) 
 [24](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_24) VALAFLAGS = \\
 [25](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_25)     $(top\_srcdir)/vapi/config.vapi \\
 [26](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_26)     --vapidir\=$(top\_srcdir)/vapi \\
 [27](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_27)     --pkg libxml\-2.0 \\
 [28](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_28)     --pkg gee\-1.0 \\
 [29](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_29)     --pkg gobject\-2.0 \\
 [30](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_30)     --pkg gio\-2.0 \\
 [31](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_31)     $(NULL)
 [32](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_32) 
 [33](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_33) libgxml\_la\_VALASOURCES = \\
 [34](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_34)         Attr.vala \\
 [35](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_35)         BackedNode.vala \\
 [36](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_36)         CDATASection.vala \\
 [37](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_37)         CharacterData.vala \\
 [38](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_38)         Comment.vala \\
 [39](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_39)         Document.vala \\
 [40](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_40)         DocumentFragment.vala \\
 [41](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_41)         DocumentType.vala \\
 [42](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_42)         DomError.vala \\
 [43](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_43)         Element.vala \\
 [44](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_44)         Entity.vala \\
 [45](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_45)         EntityReference.vala \\
 [46](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_46)         Implementation.vala \\
 [47](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_47)         NamespaceAttr.vala \\
 [48](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_48)         NodeList.vala \\
 [49](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_49)         NodeType.vala \\
 [50](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_50)         Notation.vala \\
 [51](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_51)         ProcessingInstruction.vala \\
 [52](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_52)         Text.vala \\
 [53](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_53)         XNode.vala \\
 [54](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_54)         $(NULL)
 [55](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_55) 
 [56](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_56) libgxml\_la\_SOURCES = \\
 [57](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_57)         gxml.vala.stamp \\
 [58](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_58)         $(libgxml\_la\_VALASOURCES:.vala\=.c) \\
 [59](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_59)         $(NULL) 
 [60](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_60) 
 [61](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_61) # Generate C code and headers, including GObject Introspection GIR files and VAPI file
 [62](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_62) gxml\-1.0.vapi gxml.vala.stamp GXml\-1.0.gir: $(libgxml\_la\_VALASOURCES)
 [63](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_63)         $(VALA\_COMPILER) $(VALAFLAGS) -C -H $(top\_builddir)/gxml/gxml\-dom.h --gir\=GXmlDom\-1.0.gir  --library gxmldom\-1.0 $^
 [64](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_64)         @touch $@
 [65](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_65) 
 [66](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_66) 
 [67](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_67) # Library configuration
 [68](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_68) libgxml\_la\_LDFLAGS = 
 [69](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_69) 
 [70](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_70) libgxml\_la\_LIBADD = \\
 [71](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_71)         $(GLIB\_LIBS) \\
 [72](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_72)         $(LIBXML\_LIBS) \\
 [73](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_73)         $(GIO\_LIBS) \\
 [74](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_74)         $(GEE\_LIBS) \\
 [75](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_75)         $(VALA\_LIBS) \\
 [76](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_76)         $(NULL)
 [77](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_77) 
 [78](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_78) include\_HEADERS = \\
 [79](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_79)         gxml.h \\
 [80](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_80)         $(NULL)
 [81](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_81) 
 [82](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_82) 
 [83](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_83) pkgconfigdir = $(libdir)/pkgconfig
 [84](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_84) pkgconfig\_DATA = libgxml\-1.0.pc
 [85](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_85) 
 [86](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_86) gxmlincludedir\=$(includedir)/libgxml\-1.0/gxml
 [87](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_87) gxmlinclude\_HEADERS\= gxml\-dom.h
 [88](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_88) 
 [89](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_89) # GObject Introspection
 [90](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_90) 
 [91](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_91) if ENABLE\_GI\_SYSTEM\_INSTALL
 [92](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_92) girdir = $(INTROSPECTION\_GIRDIR)
 [93](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_93) typelibsdir = $(INTROSPECTION\_TYPELIBDIR)
 [94](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_94) else
 [95](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_95) girdir = $(datadir)/gir\-1.0
 [96](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_96) typelibsdir = $(libdir)/girepository\-1.0
 [97](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_97) endif
 [98](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_98) 
 [99](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_99) # GIR files are generated automatically by Valac so is not necessary to scan source code to generate it
 [100](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_100) INTROSPECTION\_GIRS =
 [101](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_101) INTROSPECTION\_GIRS += GXmlDom\-1.0.gir
 [102](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_102) INTROSPECTION\_COMPILER\_ARGS = \\
 [103](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_103)     --includedir\=. \\
 [104](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_104)     --includedir\=$(top\_builddir)/gxml 
 [105](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_105) 
 [106](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_106) GXmlDom\-1.0.typelib: $(INTROSPECTION\_GIRS)
 [107](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_107)         $(INTROSPECTION\_COMPILER) $(INTROSPECTION\_COMPILER\_ARGS)  $< -o $@
 [108](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_108) 
 [109](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_109) gir\_DATA = $(INTROSPECTION\_GIRS)
 [110](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_110) typelibs\_DATA = GXmlDom\-1.0.typelib
 [111](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_111) 
 [112](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_112) vapidir = $(VALA\_VAPIDIR)
 [113](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_113) vapi\_DATA\=gxmldom\-1.0.vapi
 [114](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_114) 
 [115](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_115) CLEANFILES += $(INTROSPECTION\_GIRS) $(typelibs\_DATA) gxml\-1.0.vapi
 [116](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_116) 
 [117](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_117) EXTRA\_DIST = \\
 [118](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_118)         libgxml\-1.0.pc.in \\
 [119](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_119)         $(libgxml\_la\_VALASOURCES) \\
 [120](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_120)         $(typelibs\_DATA) \\
 [121](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_121)         $(INTROSPECTION\_GIRS) \\
 [122](https://wiki.gnome.org/Projects/Vala/Tutorial#CA-77fcf7178098290c034201be974b9c6e26f1b6d5_122)         gxml.vala.stamp

#### Compilation and linking using Command Line

Vala is not yet capable of directly creating dynamic or static libraries. To create a library, proceed with the \-c (compile only) switch and link the object files with your favourite linker, i.e. libtool or ar.

$ valac -c ...(source files)
$ ar cx ...(object files)

or by compiling the intermediate C code with _gcc_

$ valac -C ...(source files)
$ gcc -o my-best-library.so --shared -fPIC ...(compiled C code files)...

##### Example

The following is an example of how to write a simple library in Vala, and also to compile and test it locally without having to install it first.

Save the following code to a file _test.vala_. This is the actual library code, containing the functions we want to call from our main program.

public class MyLib : Object {
 public void hello() {
 stdout.printf("Hello World, MyLib\\n");
 }
 public int sum(int x, int y) {
 return x + y;
 }
}

Use the next command to generate _test.c_, _test.h_ and _test.vapi_ files. These are the C versions of the library to be compiled, and the VAPI file representing the library's public interface.

$ valac -C -H test.h --library test test.vala --basedir ./

Now compile the library:

$ gcc --shared -fPIC -o libtest.so $(pkg-config --cflags --libs gobject-2.0) test.c

Save the following code to a file called _hello.vala_. This is the code that will use the library we have created.

void main() {
 var test = new MyLib();
 test.hello();
 int x = 4, y = 5;
 stdout.printf("The sum of %d and %d is %d\\n", x, y, test.sum(x, y));
}

Now compile the application code, telling the compiler that we want to link against the library we just created.

$ valac -X -I. -X -L. -X -ltest -o hello hello.vala test.vapi --basedir ./

We can now run the program. This command states that any required libraries will be found in the current directory.

$ LD\_LIBRARY\_PATH=$PWD ./hello

The output of the program should be:

Hello World, MyLib
The sum of 4 and 5 is 9

You can also create a GObjectIntrospection GIR file for your library with the \--gir option:

valac -C test.vala --library test --gir Test-1.0.gir

GIR files are XML descriptions of the API.

### Binding Libraries with VAPI Files

VAPI files are descriptions of the public interface of external Vala libraries. When a library is written in Vala, this file is created by the Vala compiler, and basically an amalgamation of all public definitions from all Vala source files. For a library written in C, the VAPI file gets more complicated, particular if the naming conventions of the library do not follow the GLib convention. The VAPI file will in this case contain many annotations describing how the standardised Vala interface mangles onto the C version.

This process of creating this generally amounts to three steps,

*   Running _vala-gen-introspect_ to extract metadata from the C library.
    
*   Adding extra metadata to standardise the interface or make various other changes.
*   Generating a VAPI file from the above sources using _vapigen_.
    

Specific instructions on how to generate bindings are in the [Vala Bindings Tutorial](https://wiki.gnome.org/Projects/Vala/Bindings)

Tools
-----

The Vala distribution includes several programs to help you build and work with Vala applications. For more details of each tool, see the man pages.

### valac

_valac_ is the Vala compiler. It's primary function is to transform Vala code into compilable C code, though it can also automate the entire build and link project in simple cases.

The simple case for use is:

$ valac -o appname --pkg gee-1.0 file\_name\_1.vala file\_name\_2.vala

The \-o switch requests that an object file is created, rather than just outputting C source files. The \--pkg option says that this build needs information from the _gee-1.0_ package. You do not need to specify details about what libraries to link in, the package has this information internally. Finally, a list of source files is given. If you need a more complicated build process, use the \-C switch to generate C files instead of a binary, and continue the process manually, or through a script.

### vapigen

_vapigen_ is a tool to make bindings. It creates a VAPI files from a library's metadata and any extra information required. See also [Vala Bindings Tutorial](https://wiki.gnome.org/Projects/Vala/Bindings).

### vala-gen-introspect

_vala-gen-introspect_ is a tool for extracting metainformation about GObject based libraries. Nowadays, the preferred method is to use GObjectIntrospection instead, as vapigen can use GIR files directly. See also [Vala Bindings Tutorial](https://wiki.gnome.org/Projects/Vala/Bindings).

Techniques
----------

### Debugging

For demonstration purposes we will create a buggy program by intentionally dereferencing a null reference, which will result in a segmentation fault:

class Foo : Object {
 public int field;
}
void main() {
 Foo? foo = null;
 stdout.printf("%d\\n", foo.field);
}

$ valac debug-demo.vala
$ ./debug-demo
Segmentation fault

So how do we debug this program? The \-g command line option tells the Vala compiler to include Vala source code line information in the compiled binary, \--save-temps keeps the temporary C source files:

$ valac -g --save-temps debug-demo.vala

Vala programs can be debugged with the GNU Debugger gdb or one of its graphical front-ends, e.g. [Nemiver](http://projects.gnome.org/nemiver/).

$ nemiver debug-demo

A sample gdb session:

$ gdb debug-demo
(gdb) run
Starting program: /home/valacoder/debug-demo
Program received signal SIGSEGV, Segmentation fault.
0x0804881f in \_main () at debug-demo.vala:7
7           stdout.printf("%d\\n", foo.field);
(gdb)

### Using GLib

GLib includes a large set of utilities, including wrappers for most of the standard libc functions and more. These tools are available on all Vala platforms, even those which are not POSIX compliant. For a complete description of all that GLib provides, see the [GLib Reference Manual](https://developer.gnome.org/glib/). That reference is related to the C API for GLib, but it is mainly very simple to work out how to translate into Vala.

The GLib functions are available in Vala through the following naming convention:

C API

Vala

Example

g\_topic\_foobar()

GLib.Topic.foobar()

GLib.Path.get\_basename()

The GLib types can be used similarly:

Instantiate with

Call an object member with

GLib.Foo foo = new GLib.Foo();

foo.bar();

The APIs are not identical between C and Vala, but these naming rules should mean you can find the functions you need in the GLib VAPI files shipped with Vala, and from there find the parameters. This will hopefully suffice until more Vala documentation can be generated.

#### File Handling

For flexible file I/O and file handling see [GIO Samples](https://wiki.gnome.org/Projects/Vala/GIOSamples).

You can also use FileUtils.get\_contents to load a file into a string.

string content;
FileUtils.get\_contents("file.vala", out content);

Projects/Vala/Tutorial (last edited 2019-02-28 09:46:56 by [AlThomas](https://wiki.gnome.org/AlThomas "AlThomas @ cpc89244-aztw30-2-0-cust1145.18-1.cable.virginm.net[86.31.164.122]"))

  Search:   

<!--// Initialize search form var f = document.getElementById('searchform'); f.getElementsByTagName('label')\[0\].style.display = 'none'; var e = document.getElementById('searchinput'); searchChange(e); searchBlur(e); //-->

Copyright © 2005 - 2021 [The GNOME Project](https://www.gnome.org/). Hosted by [Red Hat](http://www.redhat.com/).

document.getElementById('current-year').innerHTML = new Date().getFullYear();

![Google Tradutor](./Projects_Vala_Tutorial - GNOME Wiki!_files/translate_24dp.png)

Texto original
==============

Sugerir uma tradução melhor

* * *
