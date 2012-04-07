	.section	__TEXT,__text,regular,pure_instructions
	.globl	__ZN6Object7compareEii
	.align	1, 0x90
__ZN6Object7compareEii:
Leh_func_begin1:
	pushq	%rbp
Ltmp0:
	movq	%rsp, %rbp
Ltmp1:
	movq	%rdi, -8(%rbp)
	movl	%esi, -12(%rbp)
	movl	%edx, -16(%rbp)
	movl	-12(%rbp), %eax
	movl	-16(%rbp), %ecx
	cmpl	%ecx, %eax
	jle	LBB1_2
	movl	-12(%rbp), %eax
	movl	%eax, -24(%rbp)
	jmp	LBB1_3
LBB1_2:
	movl	-16(%rbp), %eax
	movl	%eax, -24(%rbp)
LBB1_3:
	movl	-24(%rbp), %eax
	movl	%eax, -20(%rbp)
	movl	-20(%rbp), %eax
	popq	%rbp
	ret
Leh_func_end1:

	.section	__TEXT,__StaticInit,regular,pure_instructions
	.align	4, 0x90
__GLOBAL__I__ZN6Object7compareEii:
Leh_func_begin2:
	pushq	%rbp
Ltmp2:
	movq	%rsp, %rbp
Ltmp3:
	movl	$1, %eax
	movl	$65535, %ecx
	movl	%eax, %edi
	movl	%ecx, %esi
	callq	__Z41__static_initialization_and_destruction_0ii
	popq	%rbp
	ret
Leh_func_end2:

	.align	4, 0x90
__Z41__static_initialization_and_destruction_0ii:
Leh_func_begin3:
	pushq	%rbp
Ltmp4:
	movq	%rsp, %rbp
Ltmp5:
	subq	$16, %rsp
Ltmp6:
	movl	%edi, -4(%rbp)
	movl	%esi, -8(%rbp)
	movl	-4(%rbp), %eax
	cmpl	$1, %eax
	jne	LBB3_3
	movl	-8(%rbp), %eax
	cmpl	$65535, %eax
	jne	LBB3_3
	leaq	__ZStL8__ioinit(%rip), %rax
	movq	%rax, %rdi
	callq	__ZNSt8ios_base4InitC1Ev
	leaq	___tcf_0(%rip), %rax
	movabsq	$0, %rcx
	movq	___dso_handle@GOTPCREL(%rip), %rdx
	leaq	(%rdx), %rdx
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	___cxa_atexit
LBB3_3:
	addq	$16, %rsp
	popq	%rbp
	ret
Leh_func_end3:

	.section	__TEXT,__text,regular,pure_instructions
	.align	4, 0x90
___tcf_0:
Leh_func_begin4:
	pushq	%rbp
Ltmp7:
	movq	%rsp, %rbp
Ltmp8:
	subq	$16, %rsp
Ltmp9:
	movq	%rdi, -8(%rbp)
	leaq	__ZStL8__ioinit(%rip), %rax
	movq	%rax, %rdi
	callq	__ZNSt8ios_base4InitD1Ev
	addq	$16, %rsp
	popq	%rbp
	ret
Leh_func_end4:

	.section	__TEXT,__textcoal_nt,coalesced,pure_instructions
	.globl	__ZN6ObjectC1ESs
.weak_definition __ZN6ObjectC1ESs
	.align	1, 0x90
__ZN6ObjectC1ESs:
Leh_func_begin5:
	pushq	%rbp
Ltmp16:
	movq	%rsp, %rbp
Ltmp17:
	subq	$48, %rsp
Ltmp18:
	movq	%rdi, -8(%rbp)
	movq	%rsi, -16(%rbp)
	movq	-8(%rbp), %rax
	movq	%rax, %rdi
	callq	__ZNSsC1Ev
	movq	-8(%rbp), %rax
	movq	-16(%rbp), %rcx
Ltmp10:
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	__ZNSsaSERKSs
Ltmp11:
	jmp	LBB5_1
LBB5_1:
	jmp	LBB5_5
LBB5_2:
	movl	-44(%rbp), %eax
	movl	%eax, -20(%rbp)
	movq	-40(%rbp), %rax
	movq	%rax, -32(%rbp)
	movq	-8(%rbp), %rax
Ltmp12:
	movq	%rax, %rdi
	callq	__ZNSsD1Ev
Ltmp13:
	jmp	LBB5_3
LBB5_3:
	movq	-32(%rbp), %rax
	movq	%rax, -40(%rbp)
	movl	-20(%rbp), %eax
	movl	%eax, -44(%rbp)
	jmp	LBB5_10
LBB5_4:
	callq	__ZSt9terminatev
LBB5_5:
	addq	$48, %rsp
	popq	%rbp
	ret
LBB5_6:
Ltmp14:
	movq	%rax, -40(%rbp)
	movq	-40(%rbp), %rax
	movl	%edx, %eax
	movl	%eax, -44(%rbp)
	jmp	LBB5_8
LBB5_7:
Ltmp15:
	movq	%rax, -40(%rbp)
	movq	-40(%rbp), %rax
	movl	%edx, %eax
	movl	%eax, -44(%rbp)
	jmp	LBB5_9
LBB5_8:
	jmp	LBB5_2
LBB5_9:
	jmp	LBB5_4
LBB5_10:
	movq	-40(%rbp), %rax
	movq	%rax, %rdi
	callq	__Unwind_Resume_or_Rethrow
Leh_func_end5:
	.section	__TEXT,__gcc_except_tab
	.align	2
GCC_except_table5:
Lexception5:
	.byte	255
	.byte	155
	.byte	184
	.space	1
	.byte	3
	.byte	52
Lset0 = Leh_func_begin5-Leh_func_begin5
	.long	Lset0
Lset1 = Ltmp10-Leh_func_begin5
	.long	Lset1
	.long	0
	.byte	0
Lset2 = Ltmp10-Leh_func_begin5
	.long	Lset2
Lset3 = Ltmp11-Ltmp10
	.long	Lset3
Lset4 = Ltmp14-Leh_func_begin5
	.long	Lset4
	.byte	0
Lset5 = Ltmp12-Leh_func_begin5
	.long	Lset5
Lset6 = Ltmp13-Ltmp12
	.long	Lset6
Lset7 = Ltmp15-Leh_func_begin5
	.long	Lset7
	.byte	1
Lset8 = Ltmp13-Leh_func_begin5
	.long	Lset8
Lset9 = Leh_func_end5-Ltmp13
	.long	Lset9
	.long	0
	.byte	0


	.byte	127
	.byte	0

	.byte	0
	.align	2

	.section	__TEXT,__text,regular,pure_instructions
	.globl	_main
	.align	4, 0x90
_main:
Leh_func_begin6:
	pushq	%rbp
Ltmp33:
	movq	%rsp, %rbp
Ltmp34:
	subq	$160, %rsp
Ltmp35:
	leaq	-72(%rbp), %rax
	movq	%rax, %rdi
	callq	__ZNSaIcEC1Ev
Ltmp19:
	leaq	-80(%rbp), %rax
	leaq	L_.str(%rip), %rcx
	leaq	-72(%rbp), %rdx
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	__ZNSsC1EPKcRKSaIcE
Ltmp20:
	jmp	LBB6_1
LBB6_1:
	leaq	-80(%rbp), %rax
	movq	%rax, -88(%rbp)
Ltmp21:
	movl	$8, %eax
	movq	%rax, %rdi
	callq	__Znwm
Ltmp22:
	movq	%rax, -128(%rbp)
	jmp	LBB6_2
LBB6_2:
	movq	-128(%rbp), %rax
	movq	%rax, %rcx
	movq	%rcx, -64(%rbp)
	movq	-64(%rbp), %rcx
	movq	-88(%rbp), %rdx
Ltmp23:
	movq	%rcx, %rdi
	movq	%rdx, %rsi
	callq	__ZN6ObjectC1ESs
Ltmp24:
	jmp	LBB6_3
LBB6_3:
	movq	-64(%rbp), %rax
	movq	%rax, -96(%rbp)
Ltmp25:
	leaq	-80(%rbp), %rax
	movq	%rax, %rdi
	callq	__ZNSsD1Ev
Ltmp26:
	jmp	LBB6_4
LBB6_4:
	jmp	LBB6_9
LBB6_5:
	movl	-116(%rbp), %eax
	movl	%eax, -36(%rbp)
	movq	-112(%rbp), %rax
	movq	%rax, -48(%rbp)
	movq	-64(%rbp), %rax
	movq	%rax, %rdi
	callq	__ZdlPv
	movq	-48(%rbp), %rax
	movq	%rax, -112(%rbp)
	movl	-36(%rbp), %eax
	movl	%eax, -116(%rbp)
	jmp	LBB6_17
LBB6_6:
	movl	-116(%rbp), %eax
	movl	%eax, -20(%rbp)
	movq	-112(%rbp), %rax
	movq	%rax, -32(%rbp)
Ltmp27:
	leaq	-80(%rbp), %rax
	movq	%rax, %rdi
	callq	__ZNSsD1Ev
Ltmp28:
	jmp	LBB6_7
LBB6_7:
	movq	-32(%rbp), %rax
	movq	%rax, -112(%rbp)
	movl	-20(%rbp), %eax
	movl	%eax, -116(%rbp)
	jmp	LBB6_16
LBB6_8:
	callq	__ZSt9terminatev
LBB6_9:
	leaq	-72(%rbp), %rax
	movq	%rax, %rdi
	callq	__ZNSaIcED1Ev
	movl	$23, -100(%rbp)
	movl	$5, -104(%rbp)
	movq	-96(%rbp), %rax
	movl	-100(%rbp), %ecx
	movl	-104(%rbp), %edi
	movl	%edi, -132(%rbp)
	movq	%rax, %rdi
	movl	%ecx, %esi
	movl	-132(%rbp), %eax
	movl	%eax, %edx
	callq	__ZN6Object7compareEii
	movl	%eax, %ecx
	movq	-96(%rbp), %rdx
	movq	__ZSt4cout@GOTPCREL(%rip), %rsi
	leaq	(%rsi), %rsi
	leaq	L_.str1(%rip), %rdi
	movq	%rdi, -144(%rbp)
	movq	%rsi, %rdi
	movq	-144(%rbp), %rsi
	movl	%ecx, -148(%rbp)
	movq	%rdx, -160(%rbp)
	callq	__ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
	movq	%rax, %rdi
	movq	-160(%rbp), %rsi
	callq	__ZStlsIcSt11char_traitsIcESaIcEERSt13basic_ostreamIT_T0_ES7_RKSbIS4_S5_T1_E
	leaq	L_.str2(%rip), %rcx
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	__ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
	movl	-100(%rbp), %ecx
	movq	%rax, %rdi
	movl	%ecx, %esi
	callq	__ZNSolsEi
	leaq	L_.str3(%rip), %rcx
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	__ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
	movl	-104(%rbp), %ecx
	movq	%rax, %rdi
	movl	%ecx, %esi
	callq	__ZNSolsEi
	leaq	L_.str4(%rip), %rcx
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	__ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
	movq	%rax, %rdi
	movl	-148(%rbp), %eax
	movl	%eax, %esi
	callq	__ZNSolsEi
	leaq	L_.str5(%rip), %rcx
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	__ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
	movq	__ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_@GOTPCREL(%rip), %rcx
	leaq	(%rcx), %rcx
	movq	%rax, %rdi
	movq	%rcx, %rsi
	callq	__ZNSolsEPFRSoS_E
	movl	$0, -52(%rbp)
	movl	-52(%rbp), %eax
	movl	%eax, -4(%rbp)
	jmp	LBB6_11
LBB6_10:
	movl	-116(%rbp), %eax
	movl	%eax, -8(%rbp)
	movq	-112(%rbp), %rax
	movq	%rax, -16(%rbp)
	leaq	-72(%rbp), %rax
	movq	%rax, %rdi
	callq	__ZNSaIcED1Ev
	movq	-16(%rbp), %rax
	movq	%rax, -112(%rbp)
	movl	-8(%rbp), %eax
	movl	%eax, -116(%rbp)
	jmp	LBB6_20
LBB6_11:
	movl	-4(%rbp), %eax
	addq	$160, %rsp
	popq	%rbp
	ret
LBB6_12:
Ltmp29:
	movq	%rax, -112(%rbp)
	movq	-112(%rbp), %rax
	movl	%edx, %eax
	movl	%eax, -116(%rbp)
	jmp	LBB6_16
LBB6_13:
Ltmp30:
	movq	%rax, -112(%rbp)
	movq	-112(%rbp), %rax
	movl	%edx, %eax
	movl	%eax, -116(%rbp)
	jmp	LBB6_17
LBB6_14:
Ltmp31:
	movq	%rax, -112(%rbp)
	movq	-112(%rbp), %rax
	movl	%edx, %eax
	movl	%eax, -116(%rbp)
	jmp	LBB6_18
LBB6_15:
Ltmp32:
	movq	%rax, -112(%rbp)
	movq	-112(%rbp), %rax
	movl	%edx, %eax
	movl	%eax, -116(%rbp)
	jmp	LBB6_19
LBB6_16:
	jmp	LBB6_10
LBB6_17:
	jmp	LBB6_6
LBB6_18:
	jmp	LBB6_5
LBB6_19:
	jmp	LBB6_8
LBB6_20:
	movq	-112(%rbp), %rax
	movq	%rax, %rdi
	callq	__Unwind_Resume_or_Rethrow
Leh_func_end6:
	.section	__TEXT,__gcc_except_tab
	.align	2
GCC_except_table6:
Lexception6:
	.byte	255
	.byte	155
	.byte	210
	.space	2,128
	.space	1
	.byte	3
	.byte	78
Lset10 = Ltmp19-Leh_func_begin6
	.long	Lset10
Lset11 = Ltmp20-Ltmp19
	.long	Lset11
Lset12 = Ltmp29-Leh_func_begin6
	.long	Lset12
	.byte	0
Lset13 = Ltmp21-Leh_func_begin6
	.long	Lset13
Lset14 = Ltmp22-Ltmp21
	.long	Lset14
Lset15 = Ltmp30-Leh_func_begin6
	.long	Lset15
	.byte	0
Lset16 = Ltmp23-Leh_func_begin6
	.long	Lset16
Lset17 = Ltmp24-Ltmp23
	.long	Lset17
Lset18 = Ltmp31-Leh_func_begin6
	.long	Lset18
	.byte	0
Lset19 = Ltmp25-Leh_func_begin6
	.long	Lset19
Lset20 = Ltmp26-Ltmp25
	.long	Lset20
Lset21 = Ltmp29-Leh_func_begin6
	.long	Lset21
	.byte	0
Lset22 = Ltmp27-Leh_func_begin6
	.long	Lset22
Lset23 = Ltmp28-Ltmp27
	.long	Lset23
Lset24 = Ltmp32-Leh_func_begin6
	.long	Lset24
	.byte	1
Lset25 = Ltmp28-Leh_func_begin6
	.long	Lset25
Lset26 = Leh_func_end6-Ltmp28
	.long	Lset26
	.long	0
	.byte	0


	.byte	127
	.byte	0

	.byte	0
	.align	2

.zerofill __DATA,__bss,__ZStL8__ioinit,1,3
	.section	__TEXT,__cstring,cstring_literals
L_.str:
	.asciz	 "Hello World"

L_.str1:
	.asciz	 "The Object named "

L_.str2:
	.asciz	 "\nCompared: "

L_.str3:
	.asciz	 " with "

L_.str4:
	.asciz	 "\n"

L_.str5:
	.asciz	 " is bigger\n"

	.section	__DATA,__mod_init_func,mod_init_funcs
	.align	3
	.quad	__GLOBAL__I__ZN6Object7compareEii
	.section	__TEXT,__eh_frame,coalesced,no_toc+strip_static_syms+live_support
EH_frame0:
Lsection_eh_frame:
Leh_frame_common:
Lset27 = Leh_frame_common_end-Leh_frame_common_begin
	.long	Lset27
Leh_frame_common_begin:
	.long	0
	.byte	1
	.asciz	 "zPLR"
	.byte	1
	.byte	120
	.byte	16
	.byte	7
	.byte	155
	.long	___gxx_personality_v0@GOTPCREL+4
	.byte	16
	.byte	16
	.byte	12
	.byte	7
	.byte	8
	.byte	144
	.byte	1
	.align	3
Leh_frame_common_end:
	.globl	__ZN6Object7compareEii.eh
__ZN6Object7compareEii.eh:
Lset28 = Leh_frame_end1-Leh_frame_begin1
	.long	Lset28
Leh_frame_begin1:
Lset29 = Leh_frame_begin1-Leh_frame_common
	.long	Lset29
Ltmp36:
	.quad	Leh_func_begin1-Ltmp36
Lset30 = Leh_func_end1-Leh_func_begin1
	.quad	Lset30
	.byte	8
	.quad	0
	.byte	4
Lset31 = Ltmp0-Leh_func_begin1
	.long	Lset31
	.byte	14
	.byte	16
	.byte	134
	.byte	2
	.byte	4
Lset32 = Ltmp1-Ltmp0
	.long	Lset32
	.byte	13
	.byte	6
	.align	3
Leh_frame_end1:

__GLOBAL__I__ZN6Object7compareEii.eh:
Lset33 = Leh_frame_end2-Leh_frame_begin2
	.long	Lset33
Leh_frame_begin2:
Lset34 = Leh_frame_begin2-Leh_frame_common
	.long	Lset34
Ltmp37:
	.quad	Leh_func_begin2-Ltmp37
Lset35 = Leh_func_end2-Leh_func_begin2
	.quad	Lset35
	.byte	8
	.quad	0
	.byte	4
Lset36 = Ltmp2-Leh_func_begin2
	.long	Lset36
	.byte	14
	.byte	16
	.byte	134
	.byte	2
	.byte	4
Lset37 = Ltmp3-Ltmp2
	.long	Lset37
	.byte	13
	.byte	6
	.align	3
Leh_frame_end2:

__Z41__static_initialization_and_destruction_0ii.eh:
Lset38 = Leh_frame_end3-Leh_frame_begin3
	.long	Lset38
Leh_frame_begin3:
Lset39 = Leh_frame_begin3-Leh_frame_common
	.long	Lset39
Ltmp38:
	.quad	Leh_func_begin3-Ltmp38
Lset40 = Leh_func_end3-Leh_func_begin3
	.quad	Lset40
	.byte	8
	.quad	0
	.byte	4
Lset41 = Ltmp4-Leh_func_begin3
	.long	Lset41
	.byte	14
	.byte	16
	.byte	134
	.byte	2
	.byte	4
Lset42 = Ltmp5-Ltmp4
	.long	Lset42
	.byte	13
	.byte	6
	.align	3
Leh_frame_end3:

___tcf_0.eh:
Lset43 = Leh_frame_end4-Leh_frame_begin4
	.long	Lset43
Leh_frame_begin4:
Lset44 = Leh_frame_begin4-Leh_frame_common
	.long	Lset44
Ltmp39:
	.quad	Leh_func_begin4-Ltmp39
Lset45 = Leh_func_end4-Leh_func_begin4
	.quad	Lset45
	.byte	8
	.quad	0
	.byte	4
Lset46 = Ltmp7-Leh_func_begin4
	.long	Lset46
	.byte	14
	.byte	16
	.byte	134
	.byte	2
	.byte	4
Lset47 = Ltmp8-Ltmp7
	.long	Lset47
	.byte	13
	.byte	6
	.align	3
Leh_frame_end4:

	.globl	__ZN6ObjectC1ESs.eh
.weak_definition __ZN6ObjectC1ESs.eh
__ZN6ObjectC1ESs.eh:
Lset48 = Leh_frame_end5-Leh_frame_begin5
	.long	Lset48
Leh_frame_begin5:
Lset49 = Leh_frame_begin5-Leh_frame_common
	.long	Lset49
Ltmp40:
	.quad	Leh_func_begin5-Ltmp40
Lset50 = Leh_func_end5-Leh_func_begin5
	.quad	Lset50
	.byte	8
Ltmp41:
	.quad	Lexception5-Ltmp41
	.byte	4
Lset51 = Ltmp16-Leh_func_begin5
	.long	Lset51
	.byte	14
	.byte	16
	.byte	134
	.byte	2
	.byte	4
Lset52 = Ltmp17-Ltmp16
	.long	Lset52
	.byte	13
	.byte	6
	.align	3
Leh_frame_end5:

	.globl	_main.eh
_main.eh:
Lset53 = Leh_frame_end6-Leh_frame_begin6
	.long	Lset53
Leh_frame_begin6:
Lset54 = Leh_frame_begin6-Leh_frame_common
	.long	Lset54
Ltmp42:
	.quad	Leh_func_begin6-Ltmp42
Lset55 = Leh_func_end6-Leh_func_begin6
	.quad	Lset55
	.byte	8
Ltmp43:
	.quad	Lexception6-Ltmp43
	.byte	4
Lset56 = Ltmp33-Leh_func_begin6
	.long	Lset56
	.byte	14
	.byte	16
	.byte	134
	.byte	2
	.byte	4
Lset57 = Ltmp34-Ltmp33
	.long	Lset57
	.byte	13
	.byte	6
	.align	3
Leh_frame_end6:


.subsections_via_symbols
